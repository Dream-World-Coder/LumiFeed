from flask import Blueprint, request, jsonify, render_template
from flask_login import login_required, current_user

from ..functions.html_generator import make_collection

from ..models import db
from ..models.collection import Collection
from ..models.utils import CollectionType, user_article_collections

collection_bp = Blueprint("collection_bp", __name__)

MAX_COLLECTIONS:int = 10
MAX_ARTICLES_PER_COLLECTION:int = 256


@login_required
@collection_bp.route("/create-new-collection", methods=["POST"])
@collection_bp.route("/add_new_collection", methods=["POST"])
def add_new_collection():
    data = request.json or {}
    collection_name = data.get("name") or ""

    # recheking if None
    if not collection_name or not collection_name.strip():
        return jsonify({"error": "Please enter a collection name."}), 400

    # max length 100, to be safe 99
    if len(collection_name) > 99:
        return jsonify({"error": "Collection name is too long. Max length 99"}), 400

    # XSS && CSRF check
    if "<" in collection_name or ">" in collection_name or "script" in collection_name.lower():
        return jsonify({"error": "Collection name contains invalid characters or `script`."}), 400

    # collection limit Check
    if len(current_user.collections.all()) >= MAX_COLLECTIONS:
        return jsonify({"error": f"You have reached the maximum number of collections ({MAX_COLLECTIONS})"}), 400

    try:
        collection = Collection.query.filter_by(collection_name=collection_name).first()
        if not collection:
            # then i am making the collection and adding it in db
            collection = Collection(collection_name=collection_name, collection_type=CollectionType.CUSTOM)
            db.session.add(collection)
            db.session.flush()

        else:
            if collection in current_user.collections.all():
                # may not work, memory address different maybe
                return jsonify({"error": "Collection already exists. Choose another name."}), 400

        current_user.collections.append(collection)
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
@collection_bp.route("/delete-collection", methods=["POST"])
@collection_bp.route("/delete_collection", methods=["POST"])
@login_required
def delete_collection():
    data = request.json or {}

    if not data or "collection_name" not in data:
        return jsonify({"error": "Missing collection name."}), 400

    collection_name = data["collection_name"].strip()

    collection = Collection.query.filter_by(collection_name=collection_name).first()
    if not collection:
        return jsonify({"error": "Collection does not exist."}), 404

    if collection not in current_user.collections.all(): # not needed as i have the 3 col join table
        return jsonify({"error": "You donot have this collection."}), 404

    # Prevent deletion of default collections
    if collection.collection_type in [CollectionType.READ_LATER, CollectionType.LIKED]:
        return jsonify({"error": "You cannot delete this collection."}), 403

    try:
        current_user.collections.remove(collection)
        # db.session.delete(collection)
        # i am not using it, cuz maybe some other user uses the same collection.
        # so i have to add a check that the Collection does not have any users linked to it.
        # so check:
        if len(collection.users_who_own_it) == 0:
            # its giving error if i use collection.users_who_own_it.all()
            db.session.delete(collection)
            db.session.flush()

        # now delete the articles in the collection for the user

        # SELECT *
        # FROM user_article_collections
        # WHERE user_id = current_user.id AND collection_id = collection.id
        all_rows_to_delete = db.session.query(user_article_collections).filter(
            user_article_collections.c.user_id == current_user.id,
            user_article_collections.c.collection_id == collection.id
        ).all()
        print(all_rows_to_delete)
        # now deleting
        # DELETE FROM table_name
        # WHERE condition;
        # db.session.execute(
            # user_article_collections.delete().where(
                # user_article_collections.c.user_id == current_user.id,
                # user_article_collections.c.collection_id == collection.id
            # )
        # )
        # or
        db.session.query(user_article_collections)\
            .filter(
                user_article_collections.c.user_id == current_user.id,
                user_article_collections.c.collection_id == collection.id
            ).delete(synchronize_session=False) # faster

        db.session.commit()
        return jsonify({"message": "Collection deleted."}), 200

    except Exception as e:
        print(f"Error deleting collection: {str(e)}")
        db.session.rollback()
        return jsonify({"error": "Failed to delete collection"}), 500


@login_required
@collection_bp.route("/share-collection/<username>/<collection_name>", methods=["GET"])
def share_collection(username, collection_name):
    return render_template("share-collection.html", username=username, collection=collection_name)
