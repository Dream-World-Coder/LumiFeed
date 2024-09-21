from app.routes import app, db, User, Article
from flask import request, jsonify
from flask_login import login_required, current_user


@login_required
@app.route("/new_collection", methods=["POST"])
def f():
    assert current_user.is_authenticated
    pass
