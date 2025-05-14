from flask import Blueprint, render_template, request, redirect, url_for, flash, jsonify
from flask_login import login_user, login_required, logout_user, current_user
from flask_mail import Message
from sqlalchemy.exc import IntegrityError
import re
import os
from dotenv import load_dotenv

from . import mail

from ..models import db
from ..models.user import User
from ..models.collection import Collection
from ..models.utils import CollectionType, user_collections, user_article_collections

from ..forms import RegistrationForm, LoginForm

load_dotenv()
BACKEND_URL = os.environ.get("BACKEND_URL")
FRONTEND_URL = os.environ.get("FRONTEND_URL")

auth_bp = Blueprint("auth_bp", __name__)


"""
    when i am registering, then i am going back to lumifeed insted of /verify-eamil as
    i have used window.location.assign('lumifeed url') inn the auth/register.html
    so i have to switch it to window.location.href = '/verify-email'
    else just keep it that way.
"""



# -------------------------
# Render Verify email page
# Just an intermediate page, no such functionality up until now
# ------------------------
@auth_bp.route("/verify-email")
def verify_email():
    if current_user.is_authenticated:
        return redirect(url_for("main_bp.index"))
    return render_template("auth/verify-email.html")




# verify email token
# -------------------------
@auth_bp.route("/verify", methods=["GET"])
def verify():
  if current_user.is_authenticated:
    return redirect(url_for("main_bp.index"))

  token = request.args.get("token") if request.args.get("token") else None

  try:
    user_email = User.verify_token(token)
    user = User.query.filter_by(email=user_email).first()
    if user:
      user.email_verified = True
      db.session.commit()
      login_user(user)
      return redirect(url_for("main_bp.index"))
    else:
      return render_template("auth/verify-email.html", token=token)

  except Exception:
    return render_template("auth/verify-email.html", token=token)




# send email
# -------------------------
def send_verification_email(user: User):
    subject = "Verify Your Email Address"
    verification_link = f"{BACKEND_URL}/verify?token={user.generate_verification_token(user.email)}"

    try:
        msg = Message(
            subject=subject,
            sender="lumifeed101@gmail.com",
            recipients=[user.email]
        )

        msg.html = f"""
                    <html>
                        <body>
                            <h1 style="color: #333;">Welcome to Lumifeed!</h1>
                            <p>Dear {user.username},</p>
                            <p>Thank you for registering with us! To complete your account setup, please click the following verification link:</p>
                            <h2 style="color: #2e6da4; font-size: 14px;">{verification_link}</h2>
                            <p>This code is valid for the next 15 minutes. Please do not share it with anyone.</p>
                            <p>If you did not request this verification, please ignore this email.</p>
                            <br>
                            <p>Best regards,<br>Lumifeed Team</p>
                        </body>
                    </html>
                    """

        mail.send(msg)
        return "\n\nverification email sent\n"

    except Exception as e:
        return f"\n\nFailed to send email: {e}\n"




# resend verification email
# ------------------------
@auth_bp.route("/resend-verification-email", methods=["GET", "POST"])
def resend():
    if current_user.is_authenticated:
        return redirect(url_for("main_bp.index"))

    return "This feature will be available later."





# Register
# -------------------------
@auth_bp.route("/register", methods=["GET", "POST"])
def register():
    if current_user.is_authenticated:
        return redirect(url_for("main_bp.index"))

    form = RegistrationForm()

    if request.method == "GET":
        return render_template("auth/register.html", form=form)

    if request.method == "POST":
        data = request.json or {}

        user_name = data.get("username", "").strip().lower()
        user_email = data.get("email", "").strip().lower()
        user_password = data.get("password", "").strip()

        if not re.match(r"^[A-Za-z0-9-]{1,40}$", user_name):
            return jsonify({"error": "Username must contain only letters, numbers, and hyphens."}), 400

        user_ip = request.remote_addr if request.remote_addr else "-1.-1.-1.-1"
        user_device_info = data.get("deviceInfo") if data.get("deviceInfo") else "unknown"

        try:
            # Check for existing username/email
            if User.query.filter_by(username=user_name).first():
                return jsonify({'error': 'Username already taken'}), 409

            if User.query.filter_by(email=user_email).first():
                return jsonify({'error': 'Email already taken'}), 409

            # Create new user
            usr = User(
                username=user_name,
                email=user_email,
                ip_address=user_ip,
                device_info=user_device_info
            )
            usr.set_password(user_password)
            db.session.add(usr)
            db.session.commit()

            # now create default collections
            # ------------------------------------------------------------------
            # current_user.create_default_collections() will also work.
            # ------------------------------------------------------------------
            read_later = Collection.query.filter_by(collection_name="Read Later").first()
            liked_articles = Collection.query.filter_by(collection_name="Liked Articles").first()
            if not read_later or not liked_articles:
                read_later = Collection(collection_name="Read Later", collection_type=CollectionType.READ_LATER)
                liked_articles = Collection(collection_name="Liked Articles", collection_type=CollectionType.LIKED)
                db.session.add(read_later)
                db.session.add(liked_articles)
                db.session.commit()

            usr.collections.append(read_later)
            usr.collections.append(liked_articles)
            db.session.commit()

            # Send verification email
            send_verification_email(user=usr)

            return jsonify({'success': 'Registered successfully'}), 200

        except IntegrityError as e:
            db.session.rollback()
            return jsonify({'error': f'IntegrityError: {str(e)}'}), 409

        except Exception as e:
            db.session.rollback()
            print(e)
            return jsonify({'error': 'An error occurred during registration', 'details': str(e)}), 500

    return render_template("errors/unknown-method.html")


# Login
# -------------------------
@auth_bp.route("/login", methods=["GET", "POST"])
def login():
    if current_user.is_authenticated:
        return redirect(url_for("main_bp.index"))

    form = LoginForm()

    if request.method == "GET":
        return render_template("auth/login.html", form=form)

    elif request.method == "POST":
        data = request.json
        if not data:
            return jsonify({'error': 'No data provided'}), 400

        # Extract and clean user input
        user_email = data.get("email", "").strip().lower()
        user_password = data.get("password", "").strip()

        # Get user's IP and device info
        user_ip = request.remote_addr or "-1.-1.-1.-1"
        user_device_info = data.get("deviceInfo", "unknown")

        try:
            usr = User.query.filter_by(email=user_email).first()

            if not usr:
                return jsonify({'error': 'User not found'}), 404

            # if not usr.email_verified:
            #     return jsonify({
            #         'error': 'Email unverified. User\'s data cannot be retrieved. Try again after 24 hours.'
            #     }), 401

            if usr.failed_logins >= 5:  # Optional: Add max attempts
                return jsonify({
                    'error': 'Account temporarily locked due to too many failed attempts'
                }), 429

            if not usr.check_password(user_password):
                usr.increment_failed_logins()
                return jsonify({'error': 'Incorrect password'}), 401

            # Successful login
            usr.reset_failed_logins()
            usr.update_login_data(ip_address=user_ip, device_info=user_device_info)
            login_user(usr, remember=True)  # 365 days default

            return jsonify({'success': 'Login successful'}), 200

        except Exception as e:
            print(e)
            return jsonify({
                'error': 'An error occurred during login'
            }), 500

    return render_template("errors/unknown-method.html")


# Logout
# -------------------------
@auth_bp.route("/logout")
@login_required
def logout():
    logout_user()  # Clears the session
    flash("logout successfull", "success")
    return redirect(url_for("main_bp.index"))




# Delete Account
# -------------------------
@login_required
@auth_bp.route("/delete-account", methods=["GET", "POST"])
@auth_bp.route("/delete_account", methods=["GET", "POST"])
def delete_account():
    if not current_user.is_authenticated:
        return redirect(url_for("main_bp.index"))

    form = LoginForm()
    if request.method == "GET":
        return render_template("auth/delete-acc.html", form=form)

    if request.method == "POST":
        try:
            password = request.form.get("password")

            if password:
                password.strip()
            else:
                flash("password Not Found.", "error")
                return redirect(url_for("delete_account"))

            if current_user.check_password(password):
                # delete all user data
                # user_article_collections
                user1_data = db.session.query(user_article_collections).filter(
                    user_article_collections.c.user_id == current_user.id
                )
                print(f'deleteing {current_user}\nData:')
                print(user1_data.all())
                user1_data.delete(synchronize_session=False)

                # user_collections
                user1_collections = db.session.query(user_collections).filter(
                    user_collections.c.user_id == current_user.id
                )
                print(user1_collections.all())
                user1_collections.delete(synchronize_session=False)

                db.session.delete(current_user)
                db.session.commit()
                logout_user()
                return redirect(url_for("main_bp.index"))
            else:
                flash("Incorrect password.", "error")
                return redirect(url_for("delete_account"))

        except Exception as e:
            db.session.rollback()
            flash("An error occurred while deleting the account. Please try again later.", "error")
            print(f"Error: {e}")
            return redirect(url_for("delete_account"))


# Forgot Password
# -------------------------
@login_required
@auth_bp.route("/forgot-password", methods=["GET", "POST"])
@auth_bp.route("/forgot_password", methods=["GET", "POST"])
def forgot_password():
    # input username and email and then send a reset password email
    return "This Freature will be added later"




# Reset Password
# -------------------------
@login_required
@auth_bp.route("/reset-password", methods=["GET", "POST"])
@auth_bp.route("/reset_password", methods=["GET", "POST"])
def reset_password():
    return "This Feature will be added later"
