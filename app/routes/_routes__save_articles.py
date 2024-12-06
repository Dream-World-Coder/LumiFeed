from app.routes import app, db, Article, User, Collection, CollectionType
from flask import request, jsonify
from flask_login import login_required, current_user
from sqlalchemy.exc import IntegrityError

MAX_COLLECTIONS = 10
MAX_ARTICLES_PER_COLLECTION = 250

# if article in list(current_user.saved_articles)
#     # it will not work because the memory address of the two articles object are different even if they are same

@app.route("/add_to_read_later", methods=["POST"])
def add_to_read_later():
    if not current_user.is_authenticated:
        return jsonify({"error": "Please log in first to save articles."}), 401

    data = request.json or {}
    article_title = data.get("article_title")
    article_url = data.get("article_url")

    try:
        res = current_user.save_article(article_title, article_url, "Read Later")
        if res == -1:
            return jsonify({"error": "Article already saved in Read Later."}), 409
        return jsonify({"success": "Article saved in Read Later."}), 200

    except IntegrityError:
        print(IntegrityError)
        db.session.rollback()
        return jsonify({"error": "This article is already saved. IntegrityError"}), 409

    except Exception as e:
        print(e)
        db.session.rollback()
        return jsonify({"error": "Failed to save article. Exception"}), 500



# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# save in different collections
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
@app.route("/add_to_different_collections", methods=["POST"])
def add_to_different_collections():
    if not current_user.is_authenticated:
        return jsonify({"error": "Please log in first to save articles."}), 401

    data = request.json or {}
    article_title = data.get("article_title") or ''
    article_url = data.get("article_url") or ''
    parent_collection = data.get("parent_collection") or ''

    if len(parent_collection) == 0:
        return jsonify({'error':'collection name is blank'}), 400

    try:
        res = current_user.save_article(article_title, article_url, parent_collection)
        if res == -1:
            return jsonify({"error": f"Article already saved in {parent_collection}."}), 409
        return jsonify({"success": f"Article saved in {parent_collection}."}), 200

    except IntegrityError:
        print(IntegrityError)
        db.session.rollback()
        return jsonify({"error": "This article is already saved. IntegrityError"}), 409

    except Exception as e:
        print(e)
        db.session.rollback()
        return jsonify({"error": "Failed to save article. Exception"}), 500
