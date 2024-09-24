from dotenv import get_key
import os

"""
class Config:
    env_file = ".env"

    FLASK_APP = get_key(env_file, "FLASK_APP")
    SECRET_KEY = get_key(env_file, "SECRET_KEY")
    SQLALCHEMY_DATABASE_URI = get_key(env_file, "SQLALCHEMY_DATABASE_URI")
    SQLALCHEMY_TRACK_MODIFICATIONS = bool(
        int(get_key(env_file, "SQLALCHEMY_TRACK_MODIFICATIONS"))
    )
    
"""


# for railway
class Config:
    # Fetch environment variables
    FLASK_APP = os.environ.get("FLASK_APP", "run")
    SECRET_KEY = os.environ.get("SECRET_KEY", "aeyb72odm@wo038n3os64db$56%")
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "SQLALCHEMY_DATABASE_URI", "sqlite:///database.sqlite")
       # "postgresql://postgres:jYqcLPCMfcSFwTwocmfMAVOBlSMHwGHO@postgres.railway.internal:5432/railway", )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
