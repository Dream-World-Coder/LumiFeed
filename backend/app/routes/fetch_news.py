from flask import Blueprint, request, session, url_for, jsonify
from flask_login import current_user
from ..functions.NEWS_SCRAPER import NewsScraper
from ..functions.html_generator import gen_table, gen_table_india_news

fetchnews_bp = Blueprint("fetchnews_bp", __name__)
scraper:NewsScraper = NewsScraper()

@fetchnews_bp.route("/fetchnews", methods=["GET"])
def fetchnews():
    name_of_city = None

    # make aure to adjust keys as used in ajax url, cuz now they are the params,
    # or use data = request.json()
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

    # storing the current url in session to get back from the reading page tab
    home_url = f"{url_for('main_bp.index')}"
    # now fetch news does not render template, so i have to submit the form on home btn click. Thats
    # why, currenltly i am only returning home_url , later i will store the parameters of fetch news in a session and submit the form, oherwise i need to think og different approaches
    # session.clear()
    session["home_url"] = home_url

    match news_type:
        case "top":
            news_list = scraper.getTopNews(num=news_count)
            news_table = gen_table(news_list, current_user)

        case "india":
            news_list = scraper.getIndiaNews(num=news_count)
            news_table = gen_table_india_news(news_list, current_user)

        case "city":
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
                news_list = scraper.getCitiesNews(cityname=name_of_city, num=news_count)
                news_table = gen_table(news_list, current_user)

        case "science":
            news_list = scraper.getOthersNews(section_name="technology/science", num=news_count)
            news_table = gen_table_india_news(news_list, current_user)

        case "tech":
            news_list = scraper.getOthersNews2(section_name="technology", num=news_count)
            news_table = gen_table(news_list, current_user)

        case "business":
            news_list = scraper.getOthersNews(section_name="business", num=news_count)
            news_table = gen_table_india_news(news_list, current_user)

        case "health":
            news_list = scraper.getOthersNews(section_name="lifestyle/health", num=news_count)
            news_table = gen_table_india_news(news_list, current_user)

        case "cricket":
            news_list = scraper.getOthersNews(section_name="sports/cricket", num=news_count)
            news_table = gen_table_india_news(news_list, current_user)

        case "sports":
            news_list = scraper.getOthersNews(section_name="sports", num=news_count)
            news_table = gen_table_india_news(news_list, current_user)

        case "political_pulse":
            news_list = scraper.getOthersNews(section_name="political-pulse", num=news_count)
            news_table = gen_table_india_news(news_list, current_user)

        case "lifestyle":
            news_list = scraper.getOthersNews(section_name="lifestyle", num=news_count)
            news_table = gen_table_india_news(news_list, current_user)

        case "entertainment":
            news_list = scraper.getOthersNews3(section_name="entertainment", num=news_count)
            news_table = gen_table_india_news(news_list, current_user)

        case _:
            return jsonify({"error": "Invalid news type"}), 400

    # Return news_list and news_table as JSON
    return jsonify({"news_list": news_list, "news_table": news_table})
