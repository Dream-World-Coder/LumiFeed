from flask import request, jsonify
from app.api import app, obj


@app.route("/api/fetch/news", methods=["GET"])
def fetchnews__API():
    name_of_city = None
    #  i think in this situation i should send application/json request, as there are multiple attributes
    news_type = request.args.get("news_type")
    news_count = request.args.get("news_count")
    name_of_city = request.args.get("name_of_city")

    if not news_count:
        news_count = 25
    try:
        news_count = int(news_count)
        if news_count < 1 or news_count > 256:
            return jsonify({"error": "no of news must be in 1-256 range"}), 400
    except Exception as e:
        print(e)
        return jsonify({"error": "Invalid news count"}), 400

    if news_type == "trending":
        news_list = obj.getTopNews(num=news_count)

    elif news_type == "india":
        news_list = obj.getIndiaNews(num=news_count)

    elif news_type == "city":
        if name_of_city is None or name_of_city not in [
            "kolkata",
            "bangalore",
            "delhi",
            "mumbai",
            "lucknow",
            "pune",
            "hyderabad",
            "chennai",
            "ahmedabad",
        ]:
            return jsonify({"error": "Select a city"}), 400
        else:
            news_list = obj.getCitiesNews(cityname=name_of_city, num=news_count)

    elif news_type == "technology":
        news_list = obj.getOthersNews2(section_name="technology", num=news_count)

    elif news_type == "business" or news_type == "sports" or news_type == "lifestyle" or news_type == "entertainment":
        news_list = obj.getOthersNews(section_name=news_type, num=news_count)

    elif news_type == "science":
        news_list = obj.getOthersNews(section_name="technology/science", num=news_count)

    elif news_type == "health":
        news_list = obj.getOthersNews(section_name="lifestyle/health", num=news_count)

    elif news_type == "cricket":
        news_list = obj.getOthersNews(section_name="sports/cricket", num=news_count)

    elif news_type == "politics":
        news_list = obj.getOthersNews(section_name="political-pulse", num=news_count)

    else:
        return jsonify({"error": "Invalid news type"}), 400

    return jsonify({"news_list": news_list})
