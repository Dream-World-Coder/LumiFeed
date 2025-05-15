from flask import Blueprint, request, jsonify
import json
from ...functions.NEWS_SCRAPER_API import NewsScraperApi

articles_api_bp = Blueprint("articles_api_bp", __name__)
scraper:NewsScraperApi = NewsScraperApi()

@articles_api_bp.route("/fetch/article", methods=["GET"])
@articles_api_bp.route("/fetch-article", methods=["GET"])
@articles_api_bp.route("/extract-article", methods=["GET"])
def fetch_article__API():
  # data = request.json or {}
  # url:str = data.get("url") or ''
  # only single parameter, so no need to use application json
  url = request.args.get("url") or {}


  try:
    if len(url) == 0:
        return jsonify({"error":"url not found"})

    if "indianexpress.com/section/india/" in url:
        heading, subheading, imgUrl, news_data_string = scraper.extractNewsContentIndia(
            url=url
        )
    else:
        heading, subheading, imgUrl, news_data_string = scraper.extractNewsContent(url=url)

    response = [
        {"heading": heading},
        {"subHeading": subheading},
        {"imgUrl": imgUrl},
        {"articleContent": news_data_string}
    ]
    # print(json.dumps(response, indent=4))
    return jsonify(json.dumps(response, indent=4))

  except Exception as e:
    print(e)
    return jsonify({"error":"error"})
