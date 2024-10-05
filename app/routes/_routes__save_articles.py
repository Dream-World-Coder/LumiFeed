from app.routes import app, db, Article
from flask import request, jsonify
from flask_login import login_required, current_user
from sqlalchemy.exc import IntegrityError


MAX_COLLECTIONS = 10
MAX_ARTICLES_PER_COLLECTION = 250


@login_required
@app.route("/add_to_read_later", methods=["POST"])
def add_to_read_later():
    data = request.json
    article_title = data.get("article_title")
    article_url = data.get("article_url")

    article = Article(
        article_title=article_title,
        article_url=article_url,
        parent_collection="Read Later",
        user_id=current_user.id,
    )

    if article in current_user.saved_articles and (
        article.parent_collection == "Read Later"
    ):
        return jsonify({"error": "This article is already saved."}), 409

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
        return jsonify({"error": "Failed to save article."}), 500


# save in different collections
@login_required
@app.route("/add_to_different_collections", methods=["POST"])
def add_to_different_collections():
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

    if article in current_user.saved_articles and (
        article.parent_collection == parent_collection
    ):
        return jsonify({"error": "This article is already saved."}), 409

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
