from flask import render_template, request, session, url_for, jsonify
from app.routes import app, obj, gen_table, gen_table_2


@app.route("/fetchnews", methods=["GET"])
def fetchnews():
    city_choice = None

    news_type = request.args.get("news_type")
    news_count = request.args.get("news_count")
    city_choice = request.args.get("city_choice")

    try:
        news_count = int(news_count)
    except Exception as e:
        print(e)
        return jsonify({"error": "Invalid news count"}), 400

    # storing the current url in session to get back from the reading page
    home_url = f"{url_for('index')}"
    session["home_url"] = home_url

    if news_type == "top_n":
        news_list = obj.getTopNews(num=news_count)
        news_table = gen_table(news_list)

    elif news_type == "india_n":
        news_list = obj.getIndiaNews(num=news_count)
        news_table = gen_table_2(news_list)

    elif news_type == "city_n":
        if city_choice is None:
            return jsonify({"error": "Please select a city"}), 400
        else:
            news_list = obj.getCitiesNews(cityname=city_choice, num=news_count)
            news_table = gen_table(news_list)

    else:
        return jsonify({"error": "Invalid news type"}), 400

    # Return news_list and news_table as JSON
    return jsonify({"news_list": news_list, "news_table": news_table})
