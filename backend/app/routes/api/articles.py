from flask import Blueprint, request, jsonify
import json

from ...functions.NEWS_SCRAPER_API import NewsScraperApi
from ...functions.NEWS_EXTRACTOR import NewsExtractor

articles_api_bp = Blueprint("articles_api_bp", __name__)
scraper:NewsScraperApi = NewsScraperApi()
extractor:NewsExtractor = NewsExtractor()

@articles_api_bp.route("/fetch/article", methods=["GET"])
@articles_api_bp.route("/fetch-article", methods=["GET"])
@articles_api_bp.route("/extract-article", methods=["GET"])
def fetch_article__API():
    url = request.args.get("url") or ""

    try:
        if len(url) == 0:
            return jsonify({"error": "Url not found"})

        response = None

        if "indianexpress.com/section/india/" in url:
            response = scraper.extractNewsContentIndia(url)

        elif "indianexpress.com" in url and "indianexpress.com/section/india/" not in url:
            response = scraper.extractNewsContent(url)

        else:
            response = extractor.extract_article_content(article_link=url)

        # print(response)

        return jsonify(json.dumps(response, indent=4)), 200

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500
