from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_wtf.csrf import CSRFProtect
from flask_login import LoginManager
from app.config import Config
from app.forms import NewsForm, SearchForm

app = Flask(__name__)

# Getting config from config.py
app.config.from_object(Config)

# csrf and db
csrf = CSRFProtect(app)
db = SQLAlchemy(app)


from app import models

# from app.routes import __init__
from app import routes
