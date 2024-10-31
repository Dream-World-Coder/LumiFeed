from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_mail import Mail
from flask_wtf import csrf
from .configs import config

# csrf = CSRFProtect()
db = SQLAlchemy()
migrate = Migrate()
login_manager = LoginManager()
mail = Mail()
# login_manager.login_view = "index"


# app making
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app = Flask(__name__, template_folder="templates", static_folder="static")
app.config.from_object(config["development"])
# app.config.from_object(config["production"])

db.init_app(app)
migrate.init_app(app, db)
login_manager.init_app(app)
mail.init_app(app)


# models
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
from .models import (
    User,
    Article,
    Collections,
)

# routes
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
from .routes import (
    login,
    register,
    logout,
    delete_account,
    forgot_password,
    reset_password,
    add_new_collection,
    delete_collection,
    share_collection,
    fetchnews,
    index,
    profile,
    about,
    contact,
    anything,
    # create_tables,
    read_news_here,
    read_news_in_new_tab,
    search_in_title,
    make_summary,
)

# loading user
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))
