from flask import request, jsonify
from app.routes import app, generate_summary


@app.route("/make_summary", methods=["POST"])
def make_summary():
    data = request.json
    text = data.get("textToSummarise")
    # summary = generate_summary(text)
    summary = text
    response = {"summary": summary}
    return jsonify(response)
