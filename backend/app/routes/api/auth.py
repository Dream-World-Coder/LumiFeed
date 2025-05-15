from flask import Blueprint, jsonify, request
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_jwt_identity,
    get_jwt
)
import re

from ...routes.auth import send_verification_email

from ...models import db
from ...models.user import User
from ...models.collection import Collection
from ...models.utils import CollectionType

auth_api_bp = Blueprint("auth_api_bp", __name__)


@auth_api_bp.route("/register", methods=["POST"])
def api_register():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No data provided"}), 400

    user_name = data.get("username", "").strip().lower()
    user_email = data.get("email", "").strip().lower()
    user_password = data.get("password", "").strip()

    # Validate username format
    if not re.match(r"^[A-Za-z0-9-]{1,40}$", user_name):
        return jsonify({"error": "Username must contain only letters, numbers, and hyphens."}), 400

    user_ip = request.remote_addr if request.remote_addr else "-1.-1.-1.-1"
    user_device_info = data.get("deviceInfo", "unknown")

    try:
        # Check existing username/email
        if User.query.filter_by(username=user_name).first():
            return jsonify({"error": "Username already taken"}), 409

        if User.query.filter_by(email=user_email).first():
            return jsonify({"error": "Email already taken"}), 409

        # Create new user
        usr = User(
            username=user_name,
            email=user_email,
            ip_address=user_ip,
            device_info=user_device_info
        )
        usr.set_password(user_password)
        db.session.add(usr)

        # Create default collections
        read_later = Collection(
            collection_name="Read Later",
            collection_type=CollectionType.READ_LATER
        )
        liked_articles = Collection(
            collection_name="Liked Articles",
            collection_type=CollectionType.LIKED
        )
        db.session.add(read_later)
        db.session.add(liked_articles)

        usr.collections.extend([read_later, liked_articles])
        db.session.commit()

        # Send verification email
        send_verification_email(user=usr)

        # Create tokens
        access_token = create_access_token(identity=usr.email)
        refresh_token = create_refresh_token(identity=usr.email)

        return jsonify({
            "msg": "Registration successful",
            "access_token": access_token,
            "refresh_token": refresh_token,
            "user": {
                "id": usr.id,
                "username": usr.username,
                "email": usr.email,
                "email_verified": usr.email_verified
            }
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "error": "Registration failed",
            "details": str(e)
        }), 500

@auth_api_bp.route("/login", methods=["POST"])
def api_login():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No data provided"}), 400

    user_email = data.get("email", "").strip().lower()
    user_password = data.get("password", "").strip()
    user_ip = request.remote_addr or "-1.-1.-1.-1"
    user_device_info = data.get("deviceInfo", "unknown")

    try:
        usr = User.query.filter_by(email=user_email).first()

        if not usr:
            return jsonify({"error": "User not found"}), 404

        if usr.failed_logins >= 5:
            return jsonify({
                "error": "Account locked due to too many failed attempts"
            }), 429

        if not usr.check_password(user_password):
            usr.increment_failed_logins()
            return jsonify({"error": "Invalid credentials"}), 401

        # Successful login
        usr.reset_failed_logins()
        usr.update_login_data(ip_address=user_ip, device_info=user_device_info)

        # Create tokens
        access_token = create_access_token(identity=usr.email)
        refresh_token = create_refresh_token(identity=usr.email)

        return jsonify({
            "msg": "Login successful",
            "access_token": access_token,
            "refresh_token": refresh_token,
            "user": {
                "id": usr.id,
                "username": usr.username,
                "email": usr.email,
                "email_verified": usr.email_verified
            }
        }), 200

    except Exception as e:
        return jsonify({
            "error": "Login failed",
            "details": str(e)
        }), 500

@auth_api_bp.route("/logout", methods=["POST"])
@jwt_required()
def api_logout():
    try:
        # Add the current token to a blacklist or revoked token list
        jti = get_jwt()["jti"]
        # You might want to implement token blacklisting here
        # blocked_tokens.add(jti)

        return jsonify({"msg": "Successfully logged out"}), 200
    except Exception as e:
        return jsonify({
            "error": "Logout failed",
            "details": str(e)
        }), 500

@auth_api_bp.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    current_user = get_jwt_identity()
    new_access_token = create_access_token(identity=current_user)

    return jsonify({
        "access_token": new_access_token
    }), 200
