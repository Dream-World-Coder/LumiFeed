from flask import request, jsonify, session
from app.routes import app, generate_search_reasult, s2x1


@app.route("/search_in_title", methods=["POST"])
def search_in_title():
    news_list = session.get("news_list", [])

    if not news_list:
        return jsonify({"html": "Please fetch news first, to enable search"})

    data = request.json
    part = data.get("searchPart")
    matches = s2x1(database=news_list, part=part)
    data = generate_search_reasult(matches=matches)
    response = {"html": data}
    return jsonify(response)
