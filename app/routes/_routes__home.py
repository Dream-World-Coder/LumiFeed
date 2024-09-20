from flask import render_template
from flask_login import login_required
from app.routes import app

# from app.forms import NewsForm


@app.route("/")
@app.route("/home")
def index():
    # form = NewsForm()
    return render_template("index.html")


@login_required
@app.route("/profile")
def profile():
    return render_template("profile.html")
