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

# -------- migrate ---------
from flask_migrate import Migrate

migrate = Migrate(app, db)

# --------- models & routes ----------
from app.models.user import User
from app.models.article import Article

# from app.models import __init__

# from app.routes import __init__
from app import routes

# --------- login ----------
from flask_login import LoginManager

login_manager = LoginManager()
login_manager.init_app(app=app)


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))
