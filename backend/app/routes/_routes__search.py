from flask import request, jsonify
from app.routes import app, generate_search_reasult, s1, s2, s2x1, s3


@app.route("/search_in_title", methods=["POST"])
def search_in_title():
    # Data getting from the client-side request
    data = request.json
    news_list = data.get("news_list", [])
    part = data.get("searchPart")
    
    if not news_list:
        return jsonify({"error": "Fetch news first to enable search."}), 400
    
    if not part and not news_list:
        return jsonify({'error':'POST data keys are: searchPart<string to search>, news_list<news_list>.'})

    if len(news_list) > 2000 or len(part) > 200: # max len of news_list = 256
        return jsonify({"error": "Too large parameters."})

    # Searching through the news_list
    matches = s1(database=news_list, part=part)

    if not matches:
        return jsonify({"error": "No matches found."})
    
    search_results_html = generate_search_reasult(matches=matches)

    # Response with the search result HTML
    response = {"html": search_results_html}
    return jsonify(response)
