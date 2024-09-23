from app.routes import app, db, Article
from flask import request, jsonify
from flask_login import login_required, current_user
from sqlalchemy.exc import IntegrityError


# if the current user is logged in then only they can save articles
# else display them a message to log in first
@login_required
@app.route("/add_to_read_later", methods=["POST"])
def add_to_read_later():
    if not current_user.is_authenticated:
        return jsonify({"error": "Please Login First to save articles."}), 401

    data = request.json
    article_title = data.get("article_title")
    article_url = data.get("article_url")

    article = Article(
        article_title=article_title,
        article_url=article_url,
        parent_collection="Read Later",
        user_id=current_user.id,
    )
    try:
        db.session.add(article)
        db.session.commit()
        return jsonify({"message": "Article saved successfully!"}), 200

    except IntegrityError:
        print(IntegrityError)
        db.session.rollback()
        return jsonify({"error": "This article is already saved."}), 409

    except Exception as e:
        print(e)
        db.session.rollback()
        return (
            jsonify({"error": "Failed to save article. You Need to LOG IN first."}),
            500,
        )


# save in different playlists
@login_required
@app.route("/add_to_different_collections", methods=["POST"])
def add_to_different_collections():
    if not current_user.is_authenticated:
        return jsonify({"error": "Please Login First to save articles."}), 401

    data = request.json
    article_title = data.get("article_title")
    article_url = data.get("article_url")
    parent_collection = data.get("parent_collection")

    article = Article(
        article_title=article_title,
        article_url=article_url,
        parent_collection=parent_collection,
        user_id=current_user.id,
    )
    try:
        db.session.add(article)
        db.session.commit()
        return jsonify({"message": "Article saved successfully!"}), 200

    except IntegrityError:
        print(IntegrityError)
        db.session.rollback()
        return jsonify({"error": "This article is already saved."}), 409

    except Exception as e:
        print(e)
        db.session.rollback()
        return jsonify({"error": "Failed to save article"}), 500
