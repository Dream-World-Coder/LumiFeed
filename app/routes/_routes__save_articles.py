from app.routes import app, db, Article, User, Collection, CollectionType
from flask import request, jsonify
from flask_login import login_required, current_user
from sqlalchemy.exc import IntegrityError

MAX_COLLECTIONS = 10
MAX_ARTICLES_PER_COLLECTION = 250

# if article in list(current_user.saved_articles)
#     # it will not work because the memory address of the two articles object are different even if they are same

@app.route("/add_to_read_later", methods=["POST"])
@login_required
def add_to_read_later():
    if not current_user.is_authenticated:
        return jsonify({"error": "Please log in first to save articles."}), 401

    data = request.json or {}
    article_title = data.get("article_title")
    article_url = data.get("article_url")

    # no duplicate article in a collection
    for article in current_user.all_articles_in_collection("Read Later"):
        if article.article_url == article_url:
            return jsonify({'error': 'This article is already saved in Read Later'}), 409

    try:
        current_user.save_article(article_title, article_url, "Read Later")
        return jsonify({"success": "Article saved in Read Later."}), 200

    except IntegrityError:
        print(IntegrityError)
        db.session.rollback()
        return jsonify({"error": "This article is already saved."}), 409

    except Exception as e:
        print(e)
        db.session.rollback()
        return jsonify({"error": "Failed to save article."}), 500



# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# save in different collections
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
@login_required
@app.route("/add_to_different_collections", methods=["POST"])
def add_to_different_collections():
    if not current_user.is_authenticated:
        return jsonify({"error": "Please log in first to save articles."}), 401

    data = request.json or {}
    article_title = data.get("article_title")
    article_url = data.get("article_url")
    parent_collection = data.get("parent_collection")

    for article in current_user.all_articles_in_collection("Read Later"):
        if article.article_url == article_url:
            return jsonify({'error': 'This article is already saved in Read Later'}), 409

    try:
        current_user.save_article(article_title, article_url, parent_collection)
        return jsonify({"success": "Article saved in Read Later."}), 200

    except IntegrityError:
        print(IntegrityError)
        db.session.rollback()
        return jsonify({"error": "This article is already saved."}), 409

    except Exception as e:
        print(e)
        db.session.rollback()
        return jsonify({"error": "Failed to save article"}), 500
