from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# from flask_wtf.csrf import CSRFProtect
from app.config import Config

# from app.forms import NewsForm, SearchForm


# --------- app ----------
app = Flask(__name__, template_folder="templates", static_folder="static")

# --------- configuration ----------
app.config.from_object(Config)

# --------- csrf ----------
# csrf = CSRFProtect(app)

# --------- db ----------
db = SQLAlchemy(app)

# --------- models & routes ----------
from app import models

# from app.routes import __init__
from app import routes

# --------- login ----------
from flask_login import (
    LoginManager,
    current_user,
)

login_manager = LoginManager()
login_manager.init_app(app=app)


@login_manager.user_loader
def load_user(user_id):
    return models.User.query.get(int(user_id))
