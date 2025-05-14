import os
from dotenv import load_dotenv
from datetime import timedelta

basedir = os.path.abspath(os.path.dirname(__file__))  # i.e. ./app/
load_dotenv()

class Config:
    FLASK_APP = os.environ.get("FLASK_APP", "run")
    PORT = os.environ.get("PORT", 3000)
    HOST = "0.0.0.0"

    SECRET_KEY = os.environ.get("SECRET_KEY", os.urandom(512))

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_POOL_SIZE = 40
    # SQLALCHEMY_POOL_TIMEOUT = 35
    # SQLALCHEMY_MAX_OVERFLOW = 20

    MAIL_SERVER = 'smtp.googlemail.com'
    MAIL_USE_TLS = True
    MAIL_PORT = 587
    MAIL_USERNAME = os.getenv('EMAIL_USER')
    MAIL_PASSWORD = os.getenv('EMAIL_PASS')

    JWT_SECRET_KEY = SECRET_KEY
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)

    REMEMBER_COOKIE_DURATION = timedelta(days=30)


class DevelopmentConfig(Config):
    DEBUG = True

    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DEV_DATABASE_URL',
        "sqlite:///dev-database.sqlite"
    )


class TestingConfig(Config):
    TESTING = False

    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "TEST_DATABASE_URL",
        "sqlite:///test-database.sqlite"
    )


class ProductionConfig(Config):
    DEBUG = False

    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'PROD_DATABASE_URL', 'sqlite:///prod-database.sqlite'
    )
    # SQLALCHEMY_ENGINE_OPTIONS = {
    #     'pool_recycle': 280,
    #     'pool_pre_ping': True
    # }


configs_dictionary = {
    "dev": DevelopmentConfig,
    "test": TestingConfig,
    "prod": ProductionConfig,
    "_": DevelopmentConfig,
}
