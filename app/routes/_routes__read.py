from flask import request, jsonify, render_template, session, url_for
from app.routes import app, obj, make_another_page
import os
import time
import hashlib
import uuid


@app.route("/read_news_here", methods=["POST"])
def read_news_here():
    data = request.json
    url = data.get("url")
    max_limit = 15000

    if len(url) > max_limit:
        return "Too long url..."

    if "indianexpress.com/section/india/" in url:
        heading, subheading, imgUrl, news_data_string = obj.extractNewsContentIndia(
            url=url
        )
    else:
        heading, subheading, imgUrl, news_data_string = obj.extractNewsContent(url=url)
    response = {
        "heading": heading,
        "subheading": subheading,
        "imgUrl": imgUrl,
        "news_data_string": news_data_string,
    }
    return jsonify(response)


@app.route("/read_news_in_new_tab", methods=["POST"])
def read_news_in_new_tab():
    home_url = session.get("home_url", f"{url_for('index')}")
    heading = request.form.get("heading")
    subheading = request.form.get("subheading")
    news_content = request.form.get("news_content")
    newsImgUrl = request.form.get("newsImgUrl")

    max_limit = 15000

    if (
        len(home_url) > max_limit
        or len(heading) > max_limit
        or len(subheading) > max_limit
        or len(news_content) > max_limit
        or len(newsImgUrl) > max_limit
    ):
        return "Too long content..."

    # Generate a unique filename for this user and this news content
    user_id = session.get("user_id")
    if not user_id:
        user_id = str(uuid.uuid4())
        session["user_id"] = user_id

    content_hash = hashlib.md5(
        (heading + subheading + news_content).encode()
    ).hexdigest()
    filename = f"news_{user_id}_{content_hash}.html"
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

    # Store the filename in the session
    if "user_files" not in session:
        session["user_files"] = []
    session["user_files"].append(filename)

    return render_template(os.path.join("news", filename))


@app.teardown_request
def cleanup_user_files(exception=None):
    user_files = session.get("user_files", [])
    for filename in user_files:
        file_path = os.path.join("app", "templates", "news", filename)
        if os.path.exists(file_path):
            os.remove(file_path)
    session["user_files"] = []


@app.before_request
def check_session_expiration():
    if "user_id" in session and "last_activity" in session:
        last_activity = session["last_activity"]
        # Check if last activity was more than 30 minutes ago
        if time.time() - last_activity > 1800:  # 30 minutes
            cleanup_user_files()
            session.clear()
    session["last_activity"] = time.time()


# Periodic cleanup to catch any orphaned files
@app.cli.command("cleanup-news-files")
def cleanup_news_files():
    news_dir = os.path.join("app", "templates", "news")
    current_time = time.time()
    for filename in os.listdir(news_dir):
        file_path = os.path.join(news_dir, filename)
        if os.path.isfile(file_path):
            if current_time - os.path.getmtime(file_path) > 3600:  # 1 hour
                os.remove(file_path)
                print(f"Deleted file: {file_path}")
