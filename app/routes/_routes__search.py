from flask import request, jsonify
from app.routes import app, generate_search_reasult, s2x1


@app.route("/search_in_title", methods=["POST"])
def search_in_title():
    # Data getting from the client-side request
    data = request.json
    news_list = data.get("news_list", [])
    part = data.get("searchPart")

    if not news_list:
        return jsonify({"error": "Please fetch news first to enable search"}), 400

    # Searching through the news_list
    matches = s2x1(database=news_list, part=part)
    search_results_html = generate_search_reasult(matches=matches)

    # Response with the search result HTML
    response = {"html": search_results_html}
    return jsonify(response)
