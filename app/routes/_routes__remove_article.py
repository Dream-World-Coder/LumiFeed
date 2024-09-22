from app.routes import app, db, Article
from flask import request, jsonify
from flask_login import login_required, current_user


@login_required
@app.route("/remove_article", methods=["POST"])
def remove_article():

    data = request.json
    article_url = data.get("article_url")

    try:
        article = current_user.saved_articles.filter_by(article_url=article_url).first()
        db.session.delete(article)
        db.session.commit()
        return jsonify({"message": "Article removed successfully!"}), 200

    except Exception as e:
        print(e)
        db.session.rollback()
        return jsonify({"error": "Failed to remove article"}), 500
