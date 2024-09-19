from flask import (
    render_template,
    request,
    redirect,
    url_for,
    flash,
)
from app.routes import app, db, User


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "GET":
        return render_template("auth/login.html")
    elif request.methos == "POST":
        user_email = request.form.get("user_email")
        user_password = request.form.get("user_pass")

        usr = User.query.filter_by(email=user_email).first()

        if not usr:
            flash("User does not exist", "error")
            return redirect(url_for("login"))
        else:
            database_passord = usr.password
            if user_password != database_passord:
                flash("password incorrect.", "error")
                return redirect(url_for("login"))
            else:
                flash("Login Successfull.", "success")
                return redirect(url_for("index"))
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
        usr = User(username=user_name, email=user_email, password=user_password)
        db.session.add(usr)
        db.session.commit()
        flash("Registered successfully", "success")
        return redirect(url_for("index"))
    else:
        return render_template("errors/unknown-method.html")


# @app.route("/logout", methods=["GET", "POST"])
# def logout():
#     pass


# @app.route("/forgot_password", methods=["GET", "POST"])
# def forgot_password():
#     return render_template("auth/forgot_password.html")


# @app.route("/reset_password", methods=["GET", "POST"])
# def reset_password():
#     return render_template("auth/reset_password.html")
