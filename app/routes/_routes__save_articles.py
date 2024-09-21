from app.routes import app, db, Article
from flask import request, jsonify


@app.route("/add_to_read_later", methods=["POST"])
def add_to_read_later():
    data = request.json
    article_title = data.get("article_title")
    article_url = data.get("article_url")
    article = Article(
        article_title=article_title,
        article_url=article_url,
        parent_collection="read_later",
    )
    try:
        db.session.add(article)
        db.session.commit()
        return jsonify({"message": "Article saved successfully!"}), 200

    except Exception as e:
        print(e)
        db.session.rollback()
        return jsonify({"error": "Failed to save article"}), 500
