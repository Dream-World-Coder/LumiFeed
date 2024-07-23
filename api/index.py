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
# Expose the app for Vercel
from werkzeug.middleware.dispatcher import DispatcherMiddleware
from werkzeug.serving import run_simple

def handler(request, response):
    return app(request, response)