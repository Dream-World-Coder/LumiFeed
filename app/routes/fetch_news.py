from flask import render_template, request, session
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
        return render_template("index.html", table="None")

    home_url = f"http://127.0.0.1:5500/fetchnews?news_type={news_type}&city_choice={city_choice}&news_count={news_count}"
    session["home_url"] = home_url

    if news_type == "top_n":
        news_list = obj.getTopNews(num=news_count)
        news_table = gen_table(news_list)

    elif news_type == "india_n":
        news_list = obj.getIndiaNews(num=news_count)
        news_table = gen_table_2(news_list)

    elif news_type == "city_n":
        if city_choice is None:
            news_table = "Please select a city"
            return render_template("index.html", table=news_table)
        else:
            news_list = obj.getCitiesNews(cityname=city_choice, num=news_count)
            news_table = gen_table(news_list)

    else:
        return render_template("index.html", table="None")

    session["news_list"] = news_list
    session["news_table"] = news_table
    return render_template("index.html", table=news_table)
