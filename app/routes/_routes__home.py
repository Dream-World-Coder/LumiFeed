from flask import render_template
from app.routes import app

# from app.forms import NewsForm


@app.route("/")
@app.route("/home")
def index():
    # form = NewsForm()
    return render_template("index.html")
