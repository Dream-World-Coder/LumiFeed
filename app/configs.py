import os
from datetime import timedelta

basedir = os.path.abspath(os.path.dirname(__file__))  # app

class Config:
    FLASK_APP = os.environ.get("FLASK_APP", "run")
    PORT=8000
    SECRET_KEY = os.environ.get("SECRET_KEY", os.urandom(512))
    # FLASKY_ADMIN = os.environ.get('ADMIN')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_POOL_SIZE = 40
    SQLALCHEMY_POOL_TIMEOUT = 35
    SQLALCHEMY_MAX_OVERFLOW = 20
    MAIL_SERVER = 'smtp.googlemail.com'
    MAIL_USE_TLS = True
    MAIL_PORT = 587
    MAIL_USERNAME = os.environ.get('EMAIL_USER')
    MAIL_PASSWORD = os.environ.get('EMAIL_PASS')

    @staticmethod
    def init_app(app):
        pass


class DevelopmentConfig(Config):
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DEV_DATABASE_URL'
        # f"sqlite:///{os.path.join(basedir, 'database.sqlite')}"
    )
    REMEMBER_COOKIE_DURATION = timedelta(days=30)


class TestingConfig(Config):
    TESTING = False
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "TEST_DATABASE_URL",
        "sqlite:///test-database.sqlite"
    )
    REMEMBER_COOKIE_DURATION = timedelta(days=30)


class ProductionConfig(Config):
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'PROD_DATABASE_URL',
        os.environ.get(
            'MYSQL_DATABASE_URL',
            f"sqlite:///{os.path.join(basedir, 'database.sqlite')}"
        )
    )
    SQLALCHEMY_ENGINE_OPTIONS = {
        'pool_recycle': 280,
        'pool_pre_ping': True
    }
    REMEMBER_COOKIE_DURATION = timedelta(days=30)


config = {
    "development": DevelopmentConfig,
    "testing": TestingConfig,
    "production": ProductionConfig,
    "default": DevelopmentConfig,
}

"""
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'
login_manager.login_message_category = 'info'
"""
