from flask import Blueprint, request, jsonify
from ...functions.NEWS_SCRAPER_API import NewsScraperApi

fetchnews_api_bp = Blueprint("fetchnews_api_bp", __name__)
scraper:NewsScraperApi = NewsScraperApi()

@fetchnews_api_bp.route("/fetch/news", methods=["GET"])
@fetchnews_api_bp.route("/fetch-news", methods=["GET"])
@fetchnews_api_bp.route("/fetch_news", methods=["GET"])
def fetchnews__API():
    name_of_city = request.args.get("name_of_city")
    news_type = request.args.get("news_type")
    news_count = request.args.get("news_count")

    if not news_count:
        news_count = 25

    try:
        news_count = int(news_count)
        if news_count < 1 or news_count > 256:
            return jsonify({"error": "no of news must be in 1-256 range"}), 400
    except Exception as e:
        print(e)
        return jsonify({"error": "Invalid news count"}), 400

    if not news_type:
        return jsonify({"error": "news_type is required"}), 400

    news_type = news_type.lower()

    match news_type:
        case "trending":
            news_list = scraper.getTopNews(num=news_count)
        case "india":
            news_list = scraper.getIndiaNews(num=news_count)
        case "city":
            valid_cities = [
                "kolkata", "bangalore", "delhi", "mumbai", "lucknow",
                "pune", "hyderabad", "chennai", "ahmedabad"
            ]
            if name_of_city is None or name_of_city.lower() not in valid_cities:
                return jsonify({"error": "Select a valid city"}), 400
            news_list = scraper.getCitiesNews(cityname=name_of_city.lower(), num=news_count)
        case "technology":
            news_list = scraper.getOthersNews2(section_name="technology", num=news_count)
        case "business" | "sports" | "lifestyle" | "entertainment":
            news_list = scraper.getOthersNews(section_name=news_type, num=news_count)
        case "science":
            news_list = scraper.getOthersNews(section_name="technology/science", num=news_count)
        case "health":
            news_list = scraper.getOthersNews(section_name="lifestyle/health", num=news_count)
        case "cricket":
            news_list = scraper.getOthersNews(section_name="sports/cricket", num=news_count)
        case "politics":
            news_list = scraper.getOthersNews(section_name="political-pulse", num=news_count)
        case _:
            return jsonify({"error": "Invalid news type"}), 400

    return jsonify({"news_list": news_list})
