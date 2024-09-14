from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_object("config.Config")
db = SQLAlchemy(app)

from app.models import User, Read_later, Saved_article
from app.routes import routes
