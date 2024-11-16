from flask_migrate import current
from app.routes import app, db, Article, Collection, CollectionType
from flask import request, jsonify
from flask_login import login_required, current_user


@app.route("/remove_article", methods=["POST"])
@login_required
def remove_article():
    data = request.json or {}
    article_url = data.get("article_url")
    article_parent_collection = data.get("article_parent_collection")

    if not article_url or not article_parent_collection:
        return jsonify({"error": "cannot get article URL or article's parent collection."}), 400

    try:
        article = Article.query.filter_by(article_url=article_url).first()

        if article is None:
            return jsonify({"error": "Article not found"}), 404

        # now check if the user has it saved
        if article not in current_user.saved_articles.all():
            return jsonify({"error": "Article not found"}), 404

        # now check the collection
        collection = Collection.query.filter_by(collection_name=article_parent_collection)
        if collection not in article.collections_where_it_is_saved.all():
            return jsonify({"error": "Article not found"}), 404


        current_user.saved_articles.remove(article)
        db.session.commit()
        return jsonify({"message": "Article removed"}), 200

    except Exception as e:
        db.session.rollback()
        print(f'Error in deletibg article: {e}')
        return jsonify({"error": "Failed to remove article"}), 500
