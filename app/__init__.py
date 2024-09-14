from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from app.config import Config

app = Flask(__name__)

app.config.from_object(Config)

db = SQLAlchemy(app)

from app import models

# from app.routes import __init__
from app import routes
