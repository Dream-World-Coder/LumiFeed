from flask import render_template, redirect, url_for
from flask_login import login_required, current_user
from app.routes import app, db

# from app.forms import NewsForm


@app.route("/")
@app.route("/home")
def index():
    # form = NewsForm()
    return render_template("index.html")


@app.route("/about")
def about():
    return render_template('about.html')


@app.route("/contact")
def contact():
    return render_template('contact.html')


@login_required
@app.route("/profile")
def profile():
    if current_user.is_authenticated:
        return render_template("profile.html")
    else:
        return redirect(url_for("index"))

@app.route("/<path:any_path>")
@app.route("/home/<path:any_path>")
def anything(any_path):
    return render_template("errors/404.html")


# @app.route("/db_create_all_123_lorem")
# def create_tables():
#     db.create_all()
#     return "Tables created successfully!"
