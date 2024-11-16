from flask.templating import render_template
from app.routes import app, db, make_collection, Collection, CollectionType
from flask import request, jsonify
from flask_login import login_required, current_user

MAX_COLLECTIONS = 10
MAX_ARTICLES_PER_COLLECTION = 250


@login_required
@app.route("/add_new_collection", methods=["POST"])
def add_new_collection():
    data = request.json or {}
    collection_name = data.get("name")

    # recheking if None
    if not collection_name or not collection_name.strip():
        return jsonify({"error": "Please enter a collection name."}), 400

    # max length 100, to be safe 99
    if len(collection_name) > 99:
        return jsonify({"error": "Collection name is too long. Max length 99"}), 400

    # XSS && CSRF check
    if "<" in collection_name or ">" in collection_name or "script" in collection_name.lower() or "+" in collection_name or "-" in collection_name:
        return jsonify({"error": "Collection name contains invalid characters."}), 400

    # Check collection limit
    if len(current_user.collections.all()) >= MAX_COLLECTIONS:
        return jsonify({"error": f"You have reached the maximum number of collections ({MAX_COLLECTIONS})"}), 400

    try:
        collection = Collection.query.filter_by(collection_name=collection_name).first()
        if not collection:
            new_collection = Collection(collection_name=collection_name, collection_type=CollectionType.CUSTOM)
            db.session.add(new_collection)
            db.session.flush()

        else:
            if collection in current_user.collections.all():
                return jsonify({"error": "Collection already exists. Choose another name."}), 400

        current_user.collections.append(new_collection)
        db.session.commit()

        new_collection_html_string = make_collection(collection_name)
        return jsonify({"success": new_collection_html_string}), 200

    except Exception as e:
        app.logger.error(f"Error creating collection: {str(e)}")
        db.session.rollback()
        return jsonify({"error": "Failed to add collection"}), 500




# --------------------------------------
# delete collection
# --------------------------------------
@app.route("/delete_collection", methods=["POST"])
@login_required
def delete_collection():
    data = request.json or {}

    if not data or "collection_name" not in data:
        return jsonify({"error": "Missing collection name."}), 400

    collection_name = data["collection_name"].strip()

    collection = Collection.query.filter_by(collection_name=collection_name).first()
    if not collection:
        return jsonify({"error": "Collection does not exist."}), 404

    if collection not in current_user.collections.all():
        return jsonify({"error": "Collection doesn't exists."}), 404

    # Prevent deletion of default collections
    if collection.collection_type in [CollectionType.READ_LATER, CollectionType.LIKED]:
        return jsonify({"error": "You cannot delete this collection."}), 403

    try:
        current_user.collections.remove(collection)
        db.session.commit()
        return jsonify({"message": "Collection deleted."}), 200

    except Exception as e:
        app.logger.error(f"Error deleting collection: {str(e)}")
        db.session.rollback()
        return jsonify({"error": "Failed to delete collection"}), 500


@login_required
@app.route("/share-collection/<username>/<collection_name>", methods=["GET"])
def share_collection(username, collection_name):
    return render_template("share-collection.html", username=username, collection=collection_name)
