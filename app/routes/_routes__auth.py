from flask import (
    render_template,
    request,
    redirect,
    url_for,
    flash,
    jsonify,
    session
)
from app.routes import app, db, User, mail
from flask_login import login_user, login_required, logout_user, current_user
from sqlalchemy.exc import IntegrityError
import random, string, smtplib
# from email.mime.text import MIMEText
# from google_auth_oauthlib.flow import Flow
# from pip._vendor import cachecontrol
# import google.auth.transport.requests
# from google.oauth2 import id_token
import pathlib
import requests
import re
from random import randint
from flask_mail import Message

def generate_verification_token():
    return "".join(random.choices(string.ascii_uppercase + string.digits, k=64))


def send_verification_email(user):
    subject = "Verify Your Account"

    # Generate a 6-digit numeric verification code for simplicity
    verification_code = " ".join(str(randint(0, 9)) for _ in range(6))

    try:
        msg = Message(
            subject=subject,
            sender="lumifeed101@gmail.com",
            recipients=[user.email]
        )

        # HTML content for the verification email
        msg.html = f"""
        <html>
            <body>
                <h1 style="color: #333;">Welcome to Our Service!</h1>
                <p>Dear {user.username},</p>
                <p>Thank you for registering with us! To complete your account setup, please use the following verification code:</p>
                <h2 style="color: #2e6da4; font-size: 24px;">{verification_code}</h2>
                <p>This code is valid for the next 15 minutes. Please do not share it with anyone.</p>
                <p>If you did not request this verification, please ignore this email.</p>
                <br>
                <p>Best regards,<br>Our Service Team</p>
            </body>
        </html>
        """

        mail.send(msg)
        return verification_code

    except Exception as e:
        return f"\n\nFailed to send email: {e}"
    
@app.route("/verify-email")
def verify_email():
    return render_template("auth/verify-email.html")



# ~~~~~~~~~~~~~~~~~~~~~~~~~~`
# Register
# ~~~~~~~~~~~~~~~~~~~~~~~~~~`
@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "GET":
        return render_template("auth/register.html")

    elif request.method == "POST":
        data = request.json or {}
        
        user_name = data.get("username")
        user_email = data.get("email", "").strip().lower()
        user_password = data.get("password", "").strip()

        # Validate username format
        if not re.match(r"^[A-Za-z0-9-]{1,40}$", user_name):
            return jsonify({"error": "Username must contain only letters, numbers, and hyphens."}), 400

        user_ip = request.remote_addr if request.remote_addr else "-1.-1.-1.-1"
        user_device_info = data.get("deviceInfo") if data.get("deviceInfo") else "unknown"
        user_location = data.get("location") if data.get("location") else {}
        latitude = user_location.get("latitude") if user_location.get("latitude") else -1000
        longitude = user_location.get("longitude") if user_location.get("longitude") else -1000
        accuracy = user_location.get("accuracy") if user_location.get("accuracy") else -1000
        
        # if i just pass a second default argument to the get function its still facing None errors

        usr = User(
            username=user_name,
            email=user_email,
            password=user_password,
            ip_address=user_ip,
            device_info=user_device_info,
            latitudes=[latitude],
            longitudes=[longitude],
            accuracies=[accuracy]
        )
        usr.set_password(user_password)

        try:
            # Ensure unique username/email
            if User.query.filter_by(username=user_name).first():
                return jsonify({'error':'Username already taken'}), 409
            if User.query.filter_by(email=user_email).first():
                return jsonify({'error':'Email already taken'}), 409

            db.session.add(usr)
            db.session.commit()

            # Generate and store verification code
            verification_code = send_verification_email(usr)
            session['verification_code'] = verification_code # ask: session mane current user er session e to?
            
            redirect("/verify-email")
            verification_code_form_submission = request.form.get('verification_code')
            
            if verification_code_form_submission != verification_code:
                session.pop('verification_code') 
                return jsonify({'error':'Invalid verification code'}), 400
            
            else:
                session.pop('verification_code') 
                login_user(usr)
                return jsonify({'success': 'Registered successfully'}), 200

        except IntegrityError:
            db.session.rollback()
            return jsonify({'error':'Email or username is already taken'}), 409
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': 'An error occurred during registration', 'details': str(e)}), 500
    else:
        return render_template("errors/unknown-method.html")



# ~~~~~~~~~~~~~~~~~~~~~~~~~~
# Login
# ~~~~~~~~~~~~~~~~~~~~~~~~~~
@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "GET":
        return render_template("auth/login.html")

    elif request.method == "POST":
        # collecting data
        data = request.json
        
        assert data

        user_email = data.get("email").strip().lower()
        user_password = data.get("password").strip()

        user_ip = request.remote_addr if request.remote_addr else "-1.-1.-1.-1"
        user_device_info = data.get("deviceInfo") if data.get("deviceInfo") else "unknown"

        user_location = data.get("location") if data.get("location") else {}
        latitude = user_location.get("latitude") if user_location.get("latitude") else -1000
        longitude = user_location.get("longitude") if user_location.get("longitude") else -1000
        accuracy = user_location.get("accuracy") if user_location.get("accuracy") else -1000

        try:
            usr = User.query.filter_by(email=user_email).first()
            if not usr:
                return jsonify({'error': 'User not found'}), 404

            elif not usr.check_password(user_password):
                usr.increment_failed_logins()
                return jsonify({'error': 'Incorrect password'}), 401

            else:
                # reset failed login attempts
                usr.reset_failed_logins()
                # update last login informations
                usr.update_login_data(ip_address=user_ip, device_info=user_device_info, latitude=latitude, longitude=longitude, accuracy=accuracy)

                login_user(usr, remember=True) # default 365 days
                return jsonify({'success': 'Login successful'}), 200

        except Exception as e:
            print(e)
            return jsonify({'error': 'An error occurred during login'}), 500
    else:
        return render_template("errors/unknown-method.html")


# ~~~~~~~~~~~~~~~~~~~~~~~~~~
# Logout
# ~~~~~~~~~~~~~~~~~~~~~~~~~~
@app.route("/logout")
@login_required
def logout():
    logout_user()  # Clears the session
    flash("logout successfull", "success")
    return redirect(url_for("index"))


# ~~~~~~~~~~~~~~~~~~~~~~~~~`\
# Delete Account
# ~~~~~~~~~~~~~~~~~~~~~~~~~`/
@app.route("/delete_account", methods=["GET", "POST"])
@login_required
def delete_account():
    if request.method == "GET":
        return render_template("auth/delete-acc.html")

    if request.method == "POST":
        data = request.json
        assert data
        
        user_password = data.get("password").strip()

        if current_user.check_password(user_password):
            db.session.delete(current_user)
            db.session.commit()
            logout_user()
            return redirect(url_for("index"))
        else:
            flash("Incorrect password.", "error")
            return redirect(url_for("delete_account"))


# ~~~~~~~~~~~~~~~~~~~~~~~~~`\
# Forgot Password
# ~~~~~~~~~~~~~~~~~~~~~~~~~`/
@login_required
@app.route("/forgot_password", methods=["GET", "POST"])
def forgot_password():
    return render_template("auth/forgot-pass.html")


# ~~~~~~~~~~~~~~~~~~~~~~~~~`\
# Reset Password
# ~~~~~~~~~~~~~~~~~~~~~~~~~`/
@login_required
@app.route("/reset_password", methods=["GET", "POST"])
def reset_password():
    return render_template("auth/reset-pass.html")
