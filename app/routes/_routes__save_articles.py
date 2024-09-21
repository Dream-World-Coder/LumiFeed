from app.routes import app, db, Article
from flask import request, jsonify
from flask_login import login_required, current_user


# if the current user is logged in then only they can save articles
# else display them a message to log in first
@login_required
@app.route("/add_to_read_later", methods=["POST"])
def add_to_read_later():
    if not current_user.is_authenticated:
        return (
            jsonify({"error": "Please log in to save articles."}),
            401,
        )  # 401 Unauthorized

    data = request.json
    article_title = data.get("article_title")
    article_url = data.get("article_url")

    article = Article(
        article_title=article_title,
        article_url=article_url,
        parent_collection="read_later",
        user_id=current_user.id,
    )
    try:
        db.session.add(article)
        db.session.commit()
        return jsonify({"message": "Article saved successfully!"}), 200

    except Exception as e:
        print(e)
        db.session.rollback()
        return jsonify({"error": "Failed to save article"}), 500
