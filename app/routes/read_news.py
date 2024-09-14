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
    path = "templates/news.html"
    final_path = makeAlternateFilePath(path=path)
    with open(final_path, "w") as f:
        f.write(html_file_str)

    if "file_paths" not in session:
        session["file_paths"] = []
    session["file_paths"].append(final_path)

    return render_template(os.path.basename(final_path))


@app.teardown_request
def teardown_request(exception=None):
    file_paths = session.pop("file_paths", [])
    cleanup_files(file_paths)
