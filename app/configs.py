import os

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
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "DEV_DATABASE_URL", "sqlite:///" + os.path.join(basedir, "database.sqlite")
    )


class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "TEST_DATABASE_URL", "sqlite:///database.sqlite"
    )


class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "DATABASE_URL",
        "postgresql://postgres:jYqcLPCMfcSFwTwocmfMAVOBlSMHwGHO@postgres.railway.internal:5432/railway",
    )


config = {
    "development": DevelopmentConfig,
    "testing": TestingConfig,
    "production": ProductionConfig,
    "default": DevelopmentConfig,
}
