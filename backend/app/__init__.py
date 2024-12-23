from flask import Flask
# from flask.templating import render_template
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_mail import Mail
# from flask_wtf import csrf
from flask_apscheduler import APScheduler
from .configs import config

# from werkzeug.serving import WSGIRequestHandler
# WSGIRequestHandler.protocol_version = "HTTP/1.1"


# csrf = CSRFProtect()
db = SQLAlchemy()
migrate = Migrate()
login_manager = LoginManager()
mail = Mail()
scheduler = APScheduler()
# login_manager.login_view = "index"


# app making
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app:Flask = Flask(__name__, template_folder="templates", static_folder="static")
app.config.from_object(config["development"])
# app.config.from_object(config["production"])

db.init_app(app)
migrate.init_app(app, db)
login_manager.init_app(app)
mail.init_app(app)
scheduler.init_app(app)


# models
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
from .models import (
    User,
    Article,
    Collection,
    user_article_collections
)

# routes
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
from .routes import (
    login,
    register,
    logout,
    resend,
    delete_account,
    forgot_password,
    reset_password,
    add_to_different_collections,
    add_to_read_later,
    add_new_collection,
    delete_collection,
    share_collection,
    fetchnews,
    index,
    profile,
    about,
    contact,
    anything,
    create_tables,
    read_news_here,
    read_news_in_new_tab,
    search_in_title,
    make_summary,
    reset_user_credits,
    remove_article,
    delete_unsaved_articles,
)

def delete_unverified_users():
    with app.app_context():
        try:
            deleted_count = User.query.filter_by(email_verified=False).delete()
            db.session.commit()
            if deleted_count > 0:
                print(f"\n\n{deleted_count} unverified users deleted.\n")
        except Exception as e:
            print(e)

scheduler.add_job(func=reset_user_credits, trigger='interval', seconds=86400, id='reset_credits')
scheduler.add_job(func=delete_unverified_users, trigger='interval', seconds=86400, id='delete_unverified_users')
scheduler.add_job(func=delete_unsaved_articles, trigger='interval', seconds=86400, id='delete_unsaved_articles')

# @app.cli.command("init-db")
# def init_db_command():
#     """Clear the existing data and create new tables."""
#     db.drop_all()
#     print("deleted all tables")
#     db.create_all()
#     print("created new tables")

@app.cli.command("create-db")
def safe_db_init():
    db.create_all()
    st:str = "Tables created successfully!"
    print(st)
    return st

# error handler
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
@app.errorhandler(Exception)
def handle_exception(e):
    print(e)
    return {"error": str(e)}, 500



# loading user
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))
