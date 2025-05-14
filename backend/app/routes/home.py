from flask import Blueprint, render_template
from flask_login import current_user

main_bp = Blueprint("main_bp", __name__)

@main_bp.route("/")
@main_bp.route("/home")
def index():
  return render_template("index.html", current_user=current_user)

@main_bp.route("/<path:any_path>")
@main_bp.route("/home/<path:any_path>")
def anything(any_path):
  return render_template("errors/404.html")


@main_bp.route("/about")
def about():
  return render_template('about.html')


@main_bp.route("/contact")
def contact():
  return render_template('contact.html')

# add error handlers later
# @app.err
