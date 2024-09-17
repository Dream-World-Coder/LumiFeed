from flask import render_template
from app.routes import app


@app.route("/login", methods=["GET", "POST"])
def login():
    return render_template("auth/login.html")


@app.route("/register", methods=["GET", "POST"])
def register():
    return render_template("auth/register.html")


# @app.route("/logout", methods=["GET", "POST"])
# def logout():
#     pass


# @app.route("/forgot_password", methods=["GET", "POST"])
# def forgot_password():
#     return render_template("auth/forgot_password.html")


# @app.route("/reset_password", methods=["GET", "POST"])
# def reset_password():
#     return render_template("auth/reset_password.html")
