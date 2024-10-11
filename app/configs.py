import os
from datetime import timedelta

basedir = os.path.abspath(os.path.dirname(__file__))  # app


class Config:
    FLASK_APP = os.environ.get("FLASK_APP", "run")
    SECRET_KEY = os.environ.get("SECRET_KEY") or "aeyb72odm@wo038n3os64db$56%"
    # FLASKY_ADMIN = os.environ.get('ADMIN')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    @staticmethod
    def init_app(app):
        pass


class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = f"sqlite:///{os.path.join(basedir, 'database.sqlite')}"
    REMEMBER_COOKIE_DURATION = timedelta(days=30)


class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "TEST_DATABASE_URL", "sqlite:///test-database.sqlite"
    )
    REMEMBER_COOKIE_DURATION = timedelta(days=30)



class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "DATABASE_URL",
        "postgresql://postgres:",
    )
    REMEMBER_COOKIE_DURATION = timedelta(days=30)


config = {
    "development": DevelopmentConfig,
    "testing": TestingConfig,
    "production": ProductionConfig,
    "default": DevelopmentConfig,
}
