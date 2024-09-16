# from dotenv import get_key


# class Config:
#     env_file = ".env"

#     FLASK_APP = get_key(env_file, "FLASK_APP")
#     SECRET_KEY = get_key(env_file, "SECRET_KEY")
#     SQLALCHEMY_DATABASE_URI = get_key(env_file, "SQLALCHEMY_DATABASE_URI")
#     SQLALCHEMY_TRACK_MODIFICATIONS = bool(
#         int(get_key(env_file, "SQLALCHEMY_TRACK_MODIFICATIONS"))
#     )
import os


# for render
class Config:
    # Fetch environment variables
    FLASK_APP = os.environ.get("FLASK_APP", "run")  # Default to 'run' if not set
    SECRET_KEY = os.environ.get("SECRET_KEY", "aeyb72odm@wo038n3os64db$56%")
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "SQLALCHEMY_DATABASE_URI", "sqlite:///instance/database.sqlite"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = bool(
        int(os.environ.get("SQLALCHEMY_TRACK_MODIFICATIONS", 0))
    )
