from app.routes import app, db, Article
from flask import request, jsonify
from flask_login import login_required, current_user


@login_required
@app.route("/remove_article", methods=["POST"])
def remove_article():
    data = request.json
    article_url = data.get("article_url")

    if not article_url:
        return jsonify({"error": "No article URL provided"}), 400

    try:
        article = Article.query.filter_by(
            user_id=current_user.id, article_url=article_url
        ).first()

        if article is None:
            return jsonify({"error": "Article not found"}), 404

        db.session.delete(article)
        db.session.commit()
        return jsonify({"message": "Article removed successfully!"}), 200

    except Exception as e:
        # Use logging here in production, like logging.error(str(e))
        print(e)
        db.session.rollback()
        return jsonify({"error": "Failed to remove article"}), 500
