from flask import render_template
from app.routes import app


@app.route("/login", methods=["GET", "POST"])
def login():
    return render_template("auth/login.html")


@app.route("/register", methods=["GET", "POST"])
def register():
    return render_template("auth/register.html")
