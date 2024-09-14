from flask import render_template
from app.routes import app


@app.route("/login")
def login():
    return render_template("login.html")


@app.route("/register")
def register():
    return render_template("auth/register.html")
