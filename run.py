from app import app, db

if __name__ == "__main__":
    app.run(debug=False, port=8080, host="0.0.0.0")
