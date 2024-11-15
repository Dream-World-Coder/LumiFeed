from flask import render_template, redirect, url_for
from flask_login import login_required, current_user
from app.routes import app, db



@app.route("/")
@app.route("/home")
def index():
  return render_template("index.html")


@app.route("/about")
def about():
  return render_template('about.html')


@app.route("/contact")
def contact():
  return render_template('contact.html')


@login_required
@app.route("/profile/<username>")
def profile(username):
  if current_user.is_authenticated:
    return render_template("profile.html")
  else:
    return redirect(url_for("index"))
# so here the username is just for show.
# its not getting used.
# So changing the username parameter will not change the content
# of the page
# Its fine for my case, as i dont want user's to see other's profile by changing the parameter.
# /profile should've been fine as it was before, but this looks cool
# But i think I should still can keep the username unique, cuz in future i
# may open it up, then it would matter

@app.route("/<path:any_path>")
@app.route("/home/<path:any_path>")
def anything(any_path):
  return render_template("errors/404.html")


@app.route("/db_create_all_123_lorem")
def create_tables():
  db.create_all()
  return "Tables created successfully!"
