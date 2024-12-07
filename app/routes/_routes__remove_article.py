from flask_migrate import current
from app.routes import app, db, Article, Collection, user_article_collections
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
            return jsonify({"error": "Article not found in database. None"}), 404

        # now check if the user has it saved
        # will not work i suppose, because the memory address of the two articles object are different even if they are same
        # if article not in current_user.saved_articles.all():
            # return jsonify({"error": "Article not found in all of your saved articles"}), 404

        # now check the collection
        collection = Collection.query.filter_by(collection_name=article_parent_collection).first()
        if not collection:
            return jsonify({"error": f"Collection {article_parent_collection} not found."}), 404
        
        # if collection not in article.collections_where_it_is_saved.all():
            # return jsonify({"error": f"Article not found in {article_parent_collection} of user."}), 404
            
        # now checking if the combination exists or not
        exists_query = db.session.query(
            db.exists().where(
                (user_article_collections.c.user_id == current_user.id) &
                (user_article_collections.c.article_id == article.id) &
                (user_article_collections.c.collection_id == collection.id)
            )
        )
        row_exists = db.session.scalar(exists_query)
        
        # or
        '''
        association = db.session.query(user_article_collections)\
            .filter(
                user_article_collections.c.user_id == current_user.id,
                user_article_collections.c.article_id == article.id,
                user_article_collections.c.collection_id == collection.id
            ).first()

        row_exists = association is not None
        '''
        
        if not row_exists:
            return jsonify({"error": f"Article not found in {article_parent_collection} of user."}), 404
        

        db.session.execute(
            user_article_collections.delete().where(
                (user_article_collections.c.user_id == current_user.id) &
                (user_article_collections.c.article_id == article.id) &
                (user_article_collections.c.collection_id == collection.id)
            )
        )
        db.session.commit()
        return jsonify({"message": "Article removed"}), 200

    except Exception as e:
        db.session.rollback()
        print(f'Error in deletibg article: {e}')
        return jsonify({"error": "Failed to remove article"}), 500


# now i will add a APScheduler to delete all articles that are not saved by any user. 
#  if Article = A
#  if user_article_collections  = B
#  I need to delete, A - A(/intersect)B
def delete_unsaved_articles():
    try:
        # Find unsaved article IDs
        unsaved_article_ids = (
            db.session.query(Article.id)
            .outerjoin(user_article_collections, Article.id == user_article_collections.c.article_id)
            .filter(user_article_collections.c.article_id == None)
            .all()
        )
        
        # Bulk delete is more efficient
        if unsaved_article_ids:
            # Extract actual IDs from the result tuples
            ids_to_delete = [id_tuple[0] for id_tuple in unsaved_article_ids]
            
            # Bulk delete is more efficient than deleting one by one
            Article.query.filter(Article.id.in_(ids_to_delete)).delete(synchronize_session=False)
            db.session.commit()
        
    except Exception as e:
        db.session.rollback()
        print(f"Error deleting unsaved articles: {e}")