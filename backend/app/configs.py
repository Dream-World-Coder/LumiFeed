import os
from dotenv import load_dotenv
from datetime import timedelta

basedir = os.path.abspath(os.path.dirname(__file__))  # app
# important
load_dotenv()
class Config:
    FLASK_APP = os.environ.get("FLASK_APP", "run")
    PORT=8000
    SECRET_KEY = os.environ.get("SECRET_KEY", os.urandom(512))
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_POOL_SIZE = 40
    # SQLALCHEMY_POOL_TIMEOUT = 35
    # SQLALCHEMY_MAX_OVERFLOW = 20
    #
    MAIL_SERVER = 'smtp.googlemail.com'
    MAIL_USE_TLS = True
    MAIL_PORT = 587
    MAIL_USERNAME = os.getenv('EMAIL_USER')
    MAIL_PASSWORD = os.getenv('EMAIL_PASS')

    JWT_SECRET_KEY = "bi5bx4o5u"
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)

    @staticmethod
    def init_app(app):
        pass


class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DEV_DATABASE_URL',
        "sqlite:///dev-database.sqlite"
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
        'PROD_DATABASE_URL', 'sqlite:///prod-database.sqlite'
        # os.environ.get(
        #     'MYSQL_DATABASE_URL',
        #     f"sqlite:///{os.path.join(basedir, 'database.sqlite')}"
        # )
    )
    # SQLALCHEMY_ENGINE_OPTIONS = {
    #     'pool_recycle': 280,
    #     'pool_pre_ping': True
    # }
    REMEMBER_COOKIE_DURATION = timedelta(days=30)


config = {
    "development": DevelopmentConfig,
    "testing": TestingConfig,
    "production": ProductionConfig,
    "default": DevelopmentConfig,
}
