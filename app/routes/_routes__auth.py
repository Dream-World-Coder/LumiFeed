from flask import (
    render_template,
    request,
    redirect,
    url_for,
    flash,
)
from app.routes import app, db, User
from flask_login import login_user, login_required, logout_user
from sqlalchemy.exc import IntegrityError
import random, string, smtplib
from email.mime.text import MIMEText


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


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "GET":
        return render_template("auth/login.html")

    elif request.method == "POST":
        user_email = request.form.get("user_email")
        user_password = request.form.get("user_pass")

        try:
            usr = User.query.filter_by(email=user_email).first()
            if not usr:
                flash("User not found", "error")
                return redirect(url_for("login"))
            elif not usr.check_password(user_password):
                flash("Incorrect password.", "error")
                return redirect(url_for("login"))
            else:
                login_user(usr)
                return redirect(url_for("index"))

        except Exception as e:
            print(e)
            flash("An error occurred during login", "error")
            return redirect(url_for("login"))
    else:
        return render_template("errors/unknown-method.html")


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "GET":
        return render_template("auth/register.html")

    elif request.method == "POST":
        user_name = request.form.get("username")
        user_email = request.form.get("user_email")
        user_password = request.form.get("user_pass")

        usr = User(username=user_name, email=user_email)
        usr.set_password(user_password)

        try:
            db.session.add(usr)
            db.session.commit()
            login_user(usr)
            # now i can send users to login page or directly login them and send them in home
            return redirect(url_for("index"))

        except IntegrityError:
            print(IntegrityError)
            db.session.rollback()
            flash("Email is already taken, use another one", "error")
            return redirect(url_for("register"))

        except Exception as e:
            print(e)
            db.session.rollback()
            flash("Some error occurred", "error")
            return redirect(url_for("register"))
    else:
        return render_template("errors/unknown-method.html")


@app.route("/logout")
@login_required
def logout():
    logout_user()  # Clears the session
    # flash("Logged out successfully", "success")
    return redirect(url_for("index"))


# @app.route("/forgot_password", methods=["GET", "POST"])
# def forgot_password():
#     return render_template("auth/forgot_password.html")


# @app.route("/reset_password", methods=["GET", "POST"])
# def reset_password():
#     return render_template("auth/reset_password.html")
