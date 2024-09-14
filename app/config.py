from dotenv import get_key


class Config:
    env_file = ".env"

    FLASK_APP = get_key(env_file, "FLASK_APP")
    SECRET_KEY = get_key(env_file, "SECRET_KEY")
    SQLALCHEMY_DATABASE_URI = get_key(env_file, "SQLALCHEMY_DATABASE_URI")
    SQLALCHEMY_TRACK_MODIFICATIONS = bool(
        int(get_key(env_file, "SQLALCHEMY_TRACK_MODIFICATIONS"))
    )
