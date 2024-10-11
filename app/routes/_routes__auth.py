from flask import (
    render_template,
    request,
    redirect,
    url_for,
    flash,
    jsonify,
    session
)
from app.routes import app, db, User
from flask_login import login_user, login_required, logout_user, current_user
from sqlalchemy.exc import IntegrityError
import random, string, smtplib
from email.mime.text import MIMEText
from google_auth_oauthlib.flow import Flow
from pip._vendor import cachecontrol
import google.auth.transport.requests
from google.oauth2 import id_token
import pathlib
import requests


def generate_verification_token():
    return "".join(random.choices(string.ascii_uppercase + string.digits, k=64))


def send_verification_email(user_email, token):
    subject = "Verify your account"
    verification_link = f"http://yourdomain.com/verify?token={token}"
    body = f"Please click the link to verify your account: {verification_link}"

    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = "lumifeed101@gmail.com"
    msg["To"] = user_email

    try:
        with smtplib.SMTP("smtp.yourmailserver.com", 587) as server:
            server.starttls()
            server.login("your_email@example.com", "your_password")
            server.sendmail("your_email@example.com", user_email, msg.as_string())
    except Exception as e:
        print(f"Error sending email: {e}")


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


# ~~~~~~~~~~~~~~~~~~~~~~~~~~`
# Register
# ~~~~~~~~~~~~~~~~~~~~~~~~~~`
@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "GET":
        return render_template("auth/register.html")

    elif request.method == "POST":
        data = request.json

        user_name = data.get("username")
        user_email = data.get("email").strip().lower()
        user_password = data.get("password").strip()

        user_ip = request.remote_addr if request.remote_addr else "-1.-1.-1.-1"
        user_device_info = data.get("deviceInfo") if data.get("deviceInfo") else "unknown"

        user_location = data.get("location") if data.get("location") else {}
        latitude = user_location.get("latitude") if user_location.get("latitude") else -1000
        longitude = user_location.get("longitude") if user_location.get("longitude") else -1000
        accuracy = user_location.get("accuracy") if user_location.get("accuracy") else -1000

        usr = User(username=user_name, email=user_email, password=user_password, ip_address=user_ip, device_info=user_device_info, latitudes=[latitude], longitudes=[longitude], accuracies=[accuracy])
        usr.set_password(user_password)

        try:
            # check for existing email
            if User.query.filter_by(email=user_email).first():
                return jsonify({'error':'Email is already taken, use another one'}), 409

            # add user to database
            db.session.add(usr)
            db.session.commit()
            login_user(usr)
            # now i can send users to login page or directly login them and send them in home
            return jsonify({'success':'Registered successfully'}), 200

        except IntegrityError:
            print(IntegrityError)
            db.session.rollback()
            return jsonify({'error':'Email is already taken, use another one'}), 409

        except Exception as e:
            print(e)
            db.session.rollback()
            return jsonify({'error':'some error occurred during registration'}), 500
    else:
        return render_template("errors/unknown-method.html")


# ~~~~~~~~~~~~~~~~~~~~~~~~~~
# Logout
# ~~~~~~~~~~~~~~~~~~~~~~~~~~
@login_required
@app.route("/logout")
def logout():
    logout_user()  # Clears the session
    flash("logout successfull", "success")
    return redirect(url_for("index"))


# ~~~~~~~~~~~~~~~~~~~~~~~~~`\
# Delete Account
# ~~~~~~~~~~~~~~~~~~~~~~~~~`/
@login_required
@app.route("/delete_account", methods=["GET","POST"])
def delete_account():
    if request.method == "GET":
        return render_template("auth/delete-acc.html")

    if request.method == "POST":
        data = request.json
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
