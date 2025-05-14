from flask import Blueprint, request, jsonify, render_template, session, url_for
from flask_login import login_required, current_user
from sqlalchemy.exc import IntegrityError

import os
import time
import hashlib
import uuid

from ..functions.NEWS_SCRAPER import NewsScraper
from ..functions.html_generator import make_another_page

from ..models import db
from ..models.article import Article
from ..models.collection import Collection
from ..models.utils import user_article_collections


article_bp = Blueprint("article_bp", __name__)
scraper:NewsScraper = NewsScraper()

# extract aricle content
# -------------------------------
@article_bp.route("/extract-article", methods=["POST"])
@article_bp.route("/read_news_here", methods=["POST"])
def extract_article_content_from_url():
    data = request.json or {}
    url = data.get("url") or ""

    heading = ""
    subheading = ""
    imgUrl = ""
    news_data_string = ""

    try:
        if "indianexpress.com/section/india/" in url:
            heading, subheading, imgUrl, news_data_string = scraper.extractNewsContentIndia(
                url=url
            )
        else:
            heading, subheading, imgUrl, news_data_string = scraper.extractNewsContent(url=url)

        response = {
            "heading": heading,
            "subheading": subheading,
            "imgUrl": imgUrl,
            "news_data_string": news_data_string,
        }

        return jsonify(response)

    except Exception as e:
        print(e)
        return jsonify({"error":str(e)})


@article_bp.route("/article-reader-page", methods=["POST"])
@article_bp.route("/article", methods=["POST"])
def read_news_in_new_tab():
    """
    Back then my knowledge was less & i was confused,
    there is no need to make a seperate html file for every article,
    just use jinja template. So, DO NOT PUT THIS IN PRODUCTION.
    """
    home_url = session.get("home_url", f"{url_for('main_bp.index')}")
    heading = request.form.get("heading") or ""
    subheading = request.form.get("subheading") or ""
    news_content = request.form.get("news_content") or ""
    newsImgUrl = request.form.get("newsImgUrl") or ""

    try:
        # generate a unique filename for this user and this news content
        user_id = session.get("user_id")
        if not user_id:
            user_id = str(uuid.uuid4())
            session["user_id"] = user_id

        content_hash = hashlib.md5(
            (heading + subheading + news_content).encode()
        ).hexdigest()
        filename = f"news_{user_id}_{content_hash}.html"

        dirname = os.path.join("app", "templates", "news")
        if not os.path.exists(dirname) or not os.path.isdir(dirname):
            os.mkdir(dirname)

        path = os.path.join("app", "templates", "news", filename)

        html_file_str = make_another_page(
            home_url=home_url,
            heading=heading,
            subheading=subheading,
            news_content=news_content,
            newsImgUrl=newsImgUrl,
        )

        with open(path, "w") as f:
            f.write(html_file_str)

        # store the filename in the session
        if "user_files" not in session:
            session["user_files"] = []
        session["user_files"].append(filename)

        return render_template(os.path.join("news", filename))

    except Exception as e:
        print(e)
        return jsonify({"error":str(e)})


@article_bp.teardown_request
def cleanup_user_files(exception=None):
    user_files = session.get("user_files", [])
    for filename in user_files:
        file_path = os.path.join("app", "templates", "news", filename)
        if os.path.exists(file_path):
            os.remove(file_path)
    session["user_files"] = []


@article_bp.before_request
def check_session_expiration():
    if "user_id" in session and "last_activity" in session:
        last_activity = session["last_activity"]
        # Check if last activity was more than 30 minutes ago
        if time.time() - last_activity > 1800:  # 30 minutes
            cleanup_user_files()
            session.clear()
    session["last_activity"] = time.time()


# periodic cleanup to catch any orphaned files
@article_bp.cli.command("cleanup-news-files")
def cleanup_news_files():
    news_dir = os.path.join("app", "templates", "news")
    current_time = time.time()
    for filename in os.listdir(news_dir):
        file_path = os.path.join(news_dir, filename)
        if os.path.isfile(file_path):
            if current_time - os.path.getmtime(file_path) > 3600:  # 1 hour
                os.remove(file_path)
                print(f"Deleted file: {file_path}")


# save articles in Collection
# -------------------------------
MAX_COLLECTIONS:int = 10
MAX_ARTICLES_PER_COLLECTION:int = 256

# if article in list(current_user.saved_articles)
# it will not work because the memory address of the two articles object are different even if they are same

@article_bp.route("/add-to-read-later", methods=["POST"])
@article_bp.route("/add_to_read_later", methods=["POST"])
def add_to_read_later():
    if not current_user.is_authenticated:
        return jsonify({"error": "Please log in first to save articles."}), 401

    data = request.json or {}
    article_title = data.get("article_title")
    article_url = data.get("article_url")

    try:
        res = current_user.save_article(article_title, article_url, "Read Later")
        if res == -1:
            return jsonify({"error": "Article already saved in Read Later."}), 409
        return jsonify({"success": "Article saved in Read Later."}), 200

    except IntegrityError:
        print(IntegrityError)
        db.session.rollback()
        return jsonify({"error": "This article is already saved. IntegrityError"}), 409

    except Exception as e:
        print(e)
        db.session.rollback()
        return jsonify({"error": "Failed to save article. Exception"}), 500



# save in other collections
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
@article_bp.route("/add-to-other-collections", methods=["POST"])
@article_bp.route("/add_to_different_collections", methods=["POST"])
def add_to_different_collections():
    if not current_user.is_authenticated:
        return jsonify({"error": "Please log in first to save articles."}), 401

    data = request.json or {}
    article_title = data.get("article_title") or ''
    article_url = data.get("article_url") or ''
    parent_collection = data.get("parent_collection") or ''

    if len(parent_collection) == 0:
        return jsonify({'error':'collection name is blank'}), 400

    try:
        res = current_user.save_article(article_title, article_url, parent_collection)
        if res == -1:
            return jsonify({"error": f"Article already saved in {parent_collection}."}), 409
        return jsonify({"success": f"Article saved in {parent_collection}."}), 200

    except IntegrityError:
        print(IntegrityError)
        db.session.rollback()
        return jsonify({"error": "This article is already saved. IntegrityError"}), 409

    except Exception as e:
        print(e)
        db.session.rollback()
        return jsonify({"error": "Failed to save article. Exception"}), 500



# remove article from Collection
# -----------------------------------
@article_bp.route("/remove-article-from-collection", methods=["POST"])
@article_bp.route("/remove_article", methods=["POST"])
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
