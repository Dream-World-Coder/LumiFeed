from flask import request, jsonify
from flask_login import login_required, current_user
from flask.templating import render_template
from app import app, db
from app.models import Collection, CollectionType


MAX_COLLECTIONS = 10
MAX_ARTICLES_PER_COLLECTION = 250




def make_collection(collection_name):
    """Helper function to generate HTML for a new collection"""
    return render_template(
        "partials/collection.html",
        collection_name=collection_name,
        article_count=0
    )




@app.route("/collection/create", methods=["POST"])
@login_required
def add_new_collection():
    """Create a new collection for the current user"""
    data = request.json
    collection_name = data.get("name", "").strip()

    # Validation checks
    if not collection_name:
        return jsonify({"error": "Please enter a collection name."}), 400
        
    if len(collection_name) > 99:
        return jsonify({"error": "Collection name is too long. Max length 99 characters."}), 400
        
    # Security checks
    if "<" in collection_name or ">" in collection_name:
        return jsonify({"error": "Invalid characters in collection name."}), 400

    try:
        # Check collection limit
        existing_count = Collection.query.filter_by(user_id=current_user.id).count()
        if existing_count >= MAX_COLLECTIONS:
            return jsonify({
                "error": f"You have reached the maximum number of collections ({MAX_COLLECTIONS})."
            }), 400

        # Create new collection using the user model method
        new_collection = current_user.create_collection(collection_name)
        
        # Generate HTML for the new collection
        collection_html = make_collection(collection_name)
        
        return jsonify({
            "success": True,
            "html": collection_html,
            "collection": {
                "id": new_collection.id,
                "name": new_collection.collection_name
            }
        }), 200

    except ValueError as e:
        # Handle expected errors (like duplicate names)
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        # Handle unexpected errors
        app.logger.error(f"Error creating collection: {str(e)}")
        db.session.rollback()
        return jsonify({"error": "Failed to create collection"}), 500




@app.route("/collection/delete", methods=["POST"])
@login_required
def delete_collection():
    """Delete a user's collection"""
    data = request.json
    collection_name = data.get("collection_name", "").strip()

    if not collection_name:
        return jsonify({"error": "Missing collection name."}), 400

    try:
        # Use the user model method to delete collection
        current_user.delete_collection(collection_name)
        
        return jsonify({
            "success": True,
            "message": "Collection deleted successfully"
        }), 200

    except ValueError as e:
        # Handle expected errors (like trying to delete default collections)
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        # Handle unexpected errors
        app.logger.error(f"Error deleting collection: {str(e)}")
        db.session.rollback()
        return jsonify({"error": "Failed to delete collection"}), 500





@app.route("/collection/rename", methods=["POST"])
@login_required
def rename_collection():
    """Rename a user's collection"""
    data = request.json
    old_name = data.get("old_name", "").strip()
    new_name = data.get("new_name", "").strip()

    if not old_name or not new_name:
        return jsonify({"error": "Missing collection name(s)."}), 400

    if len(new_name) > 99:
        return jsonify({"error": "New name is too long. Max length 99 characters."}), 400

    if "<" in new_name or ">" in new_name:
        return jsonify({"error": "Invalid characters in new name."}), 400

    try:
        # Use the user model method to rename collection
        collection = current_user.rename_collection(old_name, new_name)
        
        return jsonify({
            "success": True,
            "collection": {
                "id": collection.id,
                "name": collection.collection_name
            }
        }), 200

    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        app.logger.error(f"Error renaming collection: {str(e)}")
        db.session.rollback()
        return jsonify({"error": "Failed to rename collection"}), 500
    
    
    