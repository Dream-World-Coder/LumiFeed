from flask import (
    render_template,
    request,
    redirect,
    url_for,
    flash,
)
from app.routes import app, db, User
from flask_login import login_user, login_required, logout_user
from sqlalchemy.exc import IntegrityError, DataError, OperationalError


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
