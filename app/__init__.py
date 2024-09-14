from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from dotenv import get_key

# from config import Config

app = Flask(__name__)
# app.config.from_object(Config)
env_file = ".env"
FLASK_APP = get_key(env_file, "FLASK_APP")
SECRET_KEY = get_key(env_file, "SECRET_KEY")
SQLALCHEMY_DATABASE_URI = get_key(env_file, "SQLALCHEMY_DATABASE_URI")
SQLALCHEMY_TRACK_MODIFICATIONS = bool(
    int(get_key(env_file, "SQLALCHEMY_TRACK_MODIFICATIONS"))
)

app.config["SECRET_KEY"] = SECRET_KEY
app.config["SQLALCHEMY_DATABASE_URI"] = SQLALCHEMY_DATABASE_URI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = SQLALCHEMY_TRACK_MODIFICATIONS

db = SQLAlchemy(app)

from app import models
from app import routes
