from flask import Blueprint, request, jsonify
from ...functions.NEWS_EXTRACTOR import NewsExtractor

fetchnews_api_bp = Blueprint("fetchnews_api_bp", __name__)
extractor:NewsExtractor = NewsExtractor()


@fetchnews_api_bp.route("/fetch/news", methods=["GET"])
@fetchnews_api_bp.route("/fetch-news", methods=["GET"])
@fetchnews_api_bp.route("/fetch_news", methods=["GET"])
def fetchnews__API():
    # source = request.args.get("source") or ""
    # category = request.args.get("category") or ""
    # subcategory = request.args.get("subcategory") or ""
    rss_link = request.args.get("rssLink") or ""
    number = request.args.get("number") or 25

    try:
        # if not None but not int maybe, like 'y7'
        number = int(number)
        if number < 1 or number > 256:
            return jsonify({
                "success": False,
                "error": "number of news must be in 1-256 range"
            }), 400

    except Exception as e:
        print(e)
        return jsonify({
            "success": False,
            "error": "Invalid news count"
        }), 400

    if not rss_link:
        return jsonify({
            "success": False,
            "error": "rss link is required"
        }), 400

    rss_link = extractor.normalize_link(rss_link)
    is_valid = extractor.is_valid_url(rss_link)

    if not is_valid:
        return jsonify({
            "success": False,
            "error": "rss link is invalid"
        }), 400

    try:
        news_list = extractor.extract_news_list_from_rss(rss_link, number)
        return jsonify({
            "success": True,
            "news_list": news_list
        }), 200

    except Exception as e:
        print(e)
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500
