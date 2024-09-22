from flask import request, session, url_for, jsonify
from app.routes import app, obj, gen_table, gen_table_india_news  # NewsForm


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
        if city_choice is None:
            return jsonify({"error": "Please select a city"}), 400
        else:
            news_list = obj.getCitiesNews(cityname=city_choice, num=news_count)
            news_table = gen_table(news_list)

    else:
        return jsonify({"error": "Invalid news type"}), 400

    # Return news_list and news_table as JSON
    return jsonify({"news_list": news_list, "news_table": news_table})


# from flask import request, session, url_for, jsonify, flash
# from app.routes import app, obj, NewsForm, gen_table, gen_table_india_news


# @app.route("/fetchnews", methods=["GET", "POST"])
# def fetchnews():
#     form = NewsForm()

#     # Flask-WTF handles CSRF token validation automatically
#     if form.validate_on_submit():
#         city_choice = None
#         news_type = form.news_type.data
#         news_count = form.news_count.data
#         city_choice = form.city_choice.data if news_type == "city_n" else None

#         try:
#             news_count = int(news_count)
#         except Exception as e:
#             print(e)
#             return jsonify({"error": "Invalid news count"}), 400

#         # storing the current url in session to get back from the reading page
#         home_url = f"{url_for('index')}"
#         session["home_url"] = home_url

#         if news_type == "top":
#             news_list = obj.getTopNews(num=news_count)
#             news_table = gen_table(news_list)

#         elif news_type == "india":
#             news_list = obj.getIndiaNews(num=news_count)
#             news_table = gen_table_india_news(news_list)

#         elif news_type == "city":
#             if city_choice is None:
#                 return jsonify({"error": "Please select a city"}), 400
#             else:
#                 news_list = obj.getCitiesNews(cityname=city_choice, num=news_count)
#                 news_table = gen_table(news_list)

#         else:
#             return jsonify({"error": "Invalid news type"}), 400

#         # Return JSON response for Ajax
#         return jsonify({"news_list": news_list, "news_table": news_table}), 200

#     else:
#         # If form validation fails, return errors to the frontend
#         errors = form.errors
#         return jsonify({"error": "Form validation failed", "details": errors}), 400
