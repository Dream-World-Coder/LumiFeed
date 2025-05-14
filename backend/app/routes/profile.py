from flask import Blueprint, render_template, redirect, url_for
from flask_login import login_required, current_user

profile_bp = Blueprint("profile_bp", __name__)

@login_required
@profile_bp.route("/profile/<username>")
def profile(username):
  if current_user.is_authenticated:
    return render_template("profile.html")
  else:
    return redirect(url_for("main_bp.index"))

# so here the username is just for show.
# its not getting used.
# So changing the username parameter will not change the content
# of the page
# Its fine for my case, as i dont want user's to see other's profile by changing the parameter.
# /profile should've been fine as it was before, but this looks cool
# But i think I should still can keep the username unique, cuz in future i
