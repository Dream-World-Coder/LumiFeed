from flask import (
    render_template,
    request,
    redirect,
    url_for,
    flash,
)
from app.routes import app, db, User
from werkzeug.security import generate_password_hash, check_password_hash
import bcrypt
from flask_login import login_user, login_required, logout_user


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "GET":
        return render_template("auth/login.html")

    elif request.method == "POST":
        user_email = request.form.get("user_email")
        user_password = request.form.get("user_pass")

        try:
            usr = User.query.filter_by(email=user_email).first()
        except Exception as e:
            print(e)

        if not usr:
            flash("User does not found", "error")
            return redirect(url_for("login"))
        else:
            # if not check_password_hash(usr.password, user_password):
            if not bcrypt.checkpw(
                user_password.encode("utf-8"), usr.password.encode("utf-8")
            ):
                flash("password incorrect.", "error")
                return redirect(url_for("login"))
            else:
                login_user(usr)
                # flash("Login successful", "success")
                return redirect(url_for("index"))
    else:
        return render_template("errors/unknown-method.html")


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "GET":
        return render_template("auth/register.html")

    elif request.method == "POST":
        # data collected
        user_name = request.form.get("username")
        user_email = request.form.get("user_email")
        user_password = request.form.get("user_pass")

        hashed_password = bcrypt.hashpw(user_password.encode("utf-8"), bcrypt.gensalt())

        # user model
        usr = User(username=user_name, email=user_email, password=hashed_password)
        try:
            db.session.add(usr)
            db.session.commit()
            # now i can send users to login page or directly login them and send them in home
            login_user(usr)
            return redirect(url_for("index"))

        except Exception as e:
            print(e)
            flash("Email is already taken, use another one", "error")
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
