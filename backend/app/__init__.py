from flask import Flask
from flask_cors import CORS
# from flask_wtf import CSRFProtect
from flask_login import LoginManager
from flask_jwt_extended import JWTManager
from flask_apscheduler import APScheduler

from .configs import configs_dictionary

# from .models import init_app as init_db, db
from .models.user import User

from .routes import init_app as init_routes
from .routes.summary import reset_user_credits
from .routes.articles import delete_unsaved_articles


def create_app(configs_dictionary_key="_"):
  app:Flask = Flask(__name__, template_folder="templates", static_folder="static")
  app.config.from_object(configs_dictionary[configs_dictionary_key])

  # cors
  cors = CORS()
  cors.init_app(app, origins=[
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://lumifeed.netlify.app",
    "https://lumifeed.vercel.app",
  ])

  # csrf
  # CSRFProtect(app)

  # jwt + login [session based]
  JWTManager(app)
  login_manager = LoginManager()
  login_manager.init_app(app)

  # models + db + migrate
  # init_db(app)

  # routes + mail
  init_routes(app)

  # from .api import *


  # scheduler
  scheduler:APScheduler = APScheduler()
  scheduler.init_app(app)

  def delete_unverified_users():
    with app.app_context():
      try:
        deleted_count = User.query.filter_by(email_verified=False).delete()
        # db.session.commit()
        if deleted_count > 0:
          print(f"\n\n{deleted_count} unverified users deleted.\n")
      except Exception as e:
        print(e)

  scheduler.add_job(func=reset_user_credits, trigger='interval', seconds=86400, id='reset_credits')
  scheduler.add_job(func=delete_unverified_users, trigger='interval', seconds=86400, id='delete_unverified_users')
  scheduler.add_job(func=delete_unsaved_articles, trigger='interval', seconds=86400, id='delete_unsaved_articles')


  # error handler
  # it will make every unhandled error to a res with sts code 500
  @app.errorhandler(Exception)
  def handle_exception(e):
    print(e)
    return {"error": str(e)}, 500


  # loading user
  @login_manager.user_loader
  def load_user(user_id):
    return User.query.get(int(user_id))

  return app, scheduler
