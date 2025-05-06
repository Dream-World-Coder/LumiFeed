from flask import request, jsonify
from app.api import app, obj
import json

@app.route("/api/fetch/article", methods=["GET"])
def fetch_article__API():
  # data = request.json or {}
  # url:str = data.get("url") or ''
  # only single parameter, so no need to use application  json
  url = request.args.get("url") or {}

  max_limit = 150000

  try:
    if len(url) == 0:
        return jsonify({"error":"url not found"})

    if len(url) > max_limit:
        return jsonify({"error":"Too long url..."})

    if "indianexpress.com/section/india/" in url:
        heading, subheading, imgUrl, news_data_string = obj.extractNewsContentIndia(
            url=url
        )
    else:
        heading, subheading, imgUrl, news_data_string = obj.extractNewsContent(url=url)

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
