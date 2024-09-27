from flask import request, session, url_for, jsonify
from app.routes import app, obj, gen_table, gen_table_india_news  # NewsForm


@app.route("/fetchnews", methods=["GET"])
def fetchnews():
    city_choice = None

    news_type = request.args.get("news_type")
    news_count = request.args.get("news_count")
    city_choice = request.args.get("city_choice")

    if not news_count:
        news_count = 25
    try:
        news_count = int(news_count)
        if news_count < 1 or news_count > 256:
            return jsonify({"error": "no of news must be in 1-256 range"}), 400
    except Exception as e:
        print(e)
        return jsonify({"error": "Invalid news count"}), 400

    # storing the current url in session to get back from the reading page
    home_url = f"{url_for('index')}"
    # now fetch news does not render template, so i have to submit the form on home btn click. Thats
    # why, currenltly i am only returning home_url , later i will store the parameters of fetch news in a session and submit the form, oherwise i need to think og different approaches
    # session.clear()
    session["home_url"] = home_url

    if news_type == "top":
        news_list = obj.getTopNews(num=news_count)
        news_table = gen_table(news_list)

    elif news_type == "india":
        news_list = obj.getIndiaNews(num=news_count)
        news_table = gen_table_india_news(news_list)

    elif news_type == "city":
        if city_choice is None or city_choice not in [
            "kolkata",
            "bangalore",
            "delhi",
            "mumbai",
            "lucknow",
        ]:
            return jsonify({"error": "Select a city"}), 400
        else:
            news_list = obj.getCitiesNews(cityname=city_choice, num=news_count)
            news_table = gen_table(news_list)

    else:
        return jsonify({"error": "Invalid news type"}), 400

    # Return news_list and news_table as JSON
    return jsonify({"news_list": news_list, "news_table": news_table})
