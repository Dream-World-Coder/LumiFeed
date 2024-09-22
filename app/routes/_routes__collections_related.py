from app.routes import app, db, User, Article, make_collection
from flask import request, jsonify
from flask_login import login_required, current_user


@login_required
@app.route("/add_new_collection", methods=["POST"])
def add_new_collection():
    # assert current_user.is_authenticated
    if not current_user.is_authenticated:
        return (
            jsonify({"error": "Please log in to save articles."}),
            401,
        )  # no need to check this cuz it will be only availbale if the user is logged in.
        # still adding

    data = request.json
    collection_name = data.get("name")

    # recheking if None
    if not collection_name or not collection_name.strip():
        return jsonify({"error": "Please enter a collection name."}), 400

    # max length 100, to be safe 99
    if len(collection_name) > 99:
        return jsonify({"error": "Collection name is too long."}), 400

    # XSS && CSRF check
    if "script" in collection_name.lower():
        return jsonify({"error": "Collection name cannot contain 'script'."}), 400

    try:
        existing_collections = current_user.collections
        if collection_name in existing_collections:
            return (
                jsonify({"error": "Collection already exists. choose another name."}),
                400,
            )

        existing_collections.append(collection_name)
        current_user.collections = existing_collections
        db.session.commit()
        new_collection_html_string = make_collection(collection_name)
        return jsonify({"new_collection": new_collection_html_string}), 200

    except Exception as e:
        print(e)
        db.session.rollback()
        return jsonify({"error": "Failed to save collection"}), 500


@login_required
@app.route("/delete_collection", methods=["POST"])
def delete_collection():
    # assert current_user.is_authenticated
    data = request.json
    collection_name = data.get("collection_name")

    if collection_name not in current_user.collections:
        return jsonify({"error": "Collection does not exist."}), 400

    elif collection_name == "Saved Articles" or collection_name == "Read Later":
        return jsonify({"error": "You cannot delete this collection."}), 400

    try:
        current_user.collections.remove(collection_name)
        for news_articles in current_user.saved_articles:
            if news_articles.parent_collection == collection_name:
                db.session.delete(news_articles)
        db.session.commit()
        return jsonify({"message": "Collection deleted successfully."}), 200

    except Exception as e:
        print(e)
        db.session.rollback()
        return jsonify({"error": "Failed to delete collection"}), 500


# @login_required
# @app.route("/rename_collection", methods=["POST"])
# def rename_collection():
#     # assert current_user.is_authenticated
#     if not current_user.is_authenticated:
#         return (
#             jsonify({"error": "Please log in to save articles."}),
#             401,
#         )  # no need to check this cuz it will be only availbale if the user is logged in.
#         # still adding
#     pass
