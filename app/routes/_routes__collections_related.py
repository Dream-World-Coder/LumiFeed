from app.routes import app, db, make_collection
from flask import request, jsonify
from flask_login import login_required, current_user

MAX_COLLECTIONS = 10
MAX_ARTICLES_PER_COLLECTION = 250


@login_required
@app.route("/add_new_collection", methods=["POST"])
def add_new_collection():
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
            return jsonify({"error": "Collection already exists. choose another name."}), 400

        if len(existing_collections) >= MAX_COLLECTIONS:
            return jsonify({"error": f"You have reached the maximum number of collections. {MAX_COLLECTIONS}"}), 400

        existing_collections.append(collection_name)
        current_user.collections = existing_collections
        db.session.commit()
        new_collection_html_string = make_collection(collection_name)
        return jsonify({"new_collection": new_collection_html_string}), 200

    except Exception as e:
        print(e)
        db.session.rollback()
        return jsonify({"error": "Failed to save collection"}), 500


# --------------------------------------
# delete collection
# --------------------------------------
@app.route("/delete_collection", methods=["POST"])
@login_required
def delete_collection():
    data = request.json
    if not data or "collection_name" not in data:
        return jsonify({"error": "Missing collection name."}), 400

    collection_name = data["collection_name"]

    if collection_name not in list(current_user.collections):
        return jsonify({"error": "Collection does not exist."}), 404

    if collection_name in ["Liked Articles", "Read Later"]:
        return jsonify({"error": "You cannot delete this collection."}), 403

    try:
        current_user.collections.remove(collection_name)
        articles_to_delete = [
            article
            for article in current_user.saved_articles
            if article.parent_collection == collection_name
        ]
        for article in articles_to_delete:
            db.session.delete(article)

        db.session.commit()
        return jsonify({"message": "Collection deleted successfully."}), 200
    except Exception as e:
        app.logger.error(f"Error deleting collection: {str(e)}")
        db.session.rollback()
        return jsonify({"error": "Failed to delete collection"}), 500


# @login_required
# @app.route("/rename_collection", methods=["POST"])
# def rename_collection():
#     # assert current_user.is_authenticated
#     pass
