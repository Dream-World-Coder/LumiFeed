from flask import render_template
from app.routes import app


@app.route("/")
@app.route("/home")
def index():
    return render_template("index.html")
