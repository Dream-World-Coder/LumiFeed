from flask import Flask, request, jsonify, render_template
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

# Add other routes as needed

# Make sure to expose the app
if __name__ == "__main__":
    app.run()

# For Vercel serverless function export
def handler(request, response):
    return app(request, response)
