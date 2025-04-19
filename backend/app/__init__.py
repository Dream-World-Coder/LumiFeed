from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_mail import Mail
from flask_cors import CORS
# from flask_wtf import csrf
from flask_apscheduler import APScheduler
from flask_jwt_extended import JWTManager
from .configs import config


# csrf = CSRFProtect()
db = SQLAlchemy()
migrate = Migrate()
login_manager = LoginManager()
mail = Mail()
scheduler = APScheduler()
cors = CORS()
jwt = JWTManager()


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
cors.init_app(app)
jwt.init_app(app)


from .models import *
from .routes import *
from .api import *

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
