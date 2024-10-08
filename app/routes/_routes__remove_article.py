from app.routes import app, db, Article
from flask import request, jsonify
from flask_login import login_required, current_user


@login_required
@app.route("/remove_article", methods=["POST"])
def remove_article():
    data = request.json
    article_url = data.get("article_url")
    article_parent_collection = data.get("article_parent_collection")

    if not article_url:
        return jsonify({"error": "cannot get article URL."}), 400
    
    if not article_parent_collection:
        return jsonify({"error": "cannot get article's parent collection."}), 400

    try:
        article = Article.query.filter_by(
            user_id=current_user.id, article_url=article_url, parent_collection=article_parent_collection
        ).first()

        if article is None:
            return jsonify({"error": "Article not found"}), 404

        db.session.delete(article)
        db.session.commit()
        return jsonify({"message": "Article removed"}), 200

    except Exception as e:
        # Use logging here in production, like logging.error(str(e))
        print(e)
        db.session.rollback()
        return jsonify({"error": "Failed to remove article"}), 500
