# ------------------------------------------------------------------------
# v1
# ------------------------------------------------------------------------
from flask import request, jsonify, render_template, session
from app.routes import app, obj, make_another_page, makeAlternateFilePath, cleanup_files
import os


@app.route("/read_news_here", methods=["POST"])
def read_news_here():
    data = request.json
    url = data.get("url")
    if url.__contains__("https://indianexpress.com/section/india/"):
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
    home_url = session.get("home_url", "")
    # the home_url is stored in session [from /fetch_news]
    # for making the back home href in news.html

    heading = request.form.get("heading")
    subheading = request.form.get("subheading")
    news_content = request.form.get("news_content")
    newsImgUrl = request.form.get("newsImgUrl")

    html_file_str = make_another_page(
        home_url=home_url,
        heading=heading,
        subheading=subheading,
        news_content=news_content,
        newsImgUrl=newsImgUrl,
    )
    path = "app/templates/news.html"
    # making alternate file path if it already exits
    final_path = makeAlternateFilePath(path=path)
    with open(final_path, "w") as f:
        f.write(html_file_str)

    # storing the file names in session to delete them later
    if "file_paths" not in session:
        session["file_paths"] = []
    session["file_paths"].append(final_path)

    return render_template(os.path.basename(final_path))


# deleting the news.html files after the request
@app.teardown_request
def teardown_request(exception=None):
    file_paths = session.pop("file_paths", [])
    cleanup_files(file_paths)


# ------------------------------------------------------------------------
# v2
# ------------------------------------------------------------------------
from flask import request, jsonify, render_template, session, make_response
from app.routes import app, obj, make_another_page
import os
import hashlib


@app.route("/read_news_here", methods=["POST"])
def read_news_here():
    data = request.json
    url = data.get("url")
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
    home_url = session.get("home_url", "")
    heading = request.form.get("heading")
    subheading = request.form.get("subheading")
    news_content = request.form.get("news_content")
    newsImgUrl = request.form.get("newsImgUrl")

    # Generate a unique hash for this news content
    content_hash = hashlib.md5(
        (heading + subheading + news_content).encode()
    ).hexdigest()

    # Check if we've already generated this page
    if content_hash in session.get("generated_pages", {}):
        return render_template(session["generated_pages"][content_hash])

    html_file_str = make_another_page(
        home_url=home_url,
        heading=heading,
        subheading=subheading,
        news_content=news_content,
        newsImgUrl=newsImgUrl,
    )

    # Use the hash to create a unique filename
    filename = f"news_{content_hash}.html"
    path = os.path.join("app", "templates", "news", filename)

    with open(path, "w") as f:
        f.write(html_file_str)

    # Store the filename in the session
    if "generated_pages" not in session:
        session["generated_pages"] = {}
    session["generated_pages"][content_hash] = os.path.join("news", filename)

    return render_template(os.path.join("news", filename))


@app.teardown_appcontext
def cleanup_old_files(exception=None):
    news_dir = os.path.join("app", "templates", "news")
    current_time = time.time()
    for filename in os.listdir(news_dir):
        file_path = os.path.join(news_dir, filename)
        if os.path.isfile(file_path):
            if current_time - os.path.getmtime(file_path) > 3600:  # 1 hour
                os.remove(file_path)


# Run cleanup periodically
import threading
import time


def periodic_cleanup():
    while True:
        time.sleep(360)  # Wait for 0.1 hour
        with app.app_context():
            cleanup_old_files()


cleanup_thread = threading.Thread(target=periodic_cleanup)
cleanup_thread.start()
