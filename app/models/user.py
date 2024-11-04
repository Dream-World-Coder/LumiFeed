from enum import unique
from app import app
from app.models import db
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

from sqlalchemy.ext.mutable import MutableList
from sqlalchemy import PickleType, Float, ARRAY, JSON, Boolean
from datetime import datetime
from itsdangerous import URLSafeTimedSerializer

# verification

class User(db.Model, UserMixin):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)

    username = db.Column(db.String(64), nullable=False, unique=True)
    email = db.Column(db.String(128), nullable=False, unique=True)
    password = db.Column(db.String(200), nullable=False)
    # email_verified = db.Column(db.SmallInteger, nullable=False, default=0)
    email_verified = db.Column(db.Boolean, nullable=False, default=False)
    # 0-1-2 , possible states, 0 -> 1, 1 -> 2, 0 -> 2 not possible
    # 0-> just created the User
    # 1-> email not verified
    # 2-> email verified

    profile_pic = db.Column(db.String(256), nullable=False, default="images/default-profile.svg")

    last_login = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    ip_address = db.Column(db.String(39), nullable=False)  # IPv6-compatible
    device_info = db.Column(db.Text, nullable=False)

    failed_logins = db.Column(db.SmallInteger, nullable=False, default=0)

    saved_articles = db.relationship("Article", backref="author", lazy=True)

    # need to make Location and Collection tables
    latitudes = db.Column(MutableList.as_mutable(JSON), nullable=False)
    longitudes = db.Column(MutableList.as_mutable(JSON), nullable=False)
    accuracies = db.Column(MutableList.as_mutable(JSON), nullable=True)

    collections = db.Column(
        MutableList.as_mutable(PickleType), default=["Read Later", "Liked Articles"]
    )

    def get_id(self):
        return str(self.id)

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def update_login_data(self, ip_address, device_info, latitude, longitude, accuracy):
        """Update the user's login data such as IP and device info on successful login."""
        self.last_login = datetime.utcnow()
        self.ip_address = ip_address
        self.device_info = device_info

        if self.latitudes is None:
            self.latitudes = []
        if self.longitudes is None:
            self.longitudes = []
        if self.accuracies is None:
            self.accuracies = []

        self.latitudes.append(latitude)
        self.longitudes.append(longitude)
        self.accuracies.append(accuracy)

        db.session.commit()

    def increment_failed_logins(self):
        """Increment the failed login attempt count."""
        self.failed_logins += 1
        db.session.commit()

    def reset_failed_logins(self):
        """Reset failed login attempts after a successful login."""
        self.failed_logins = 0
        db.session.commit()

    def generate_verification_token(self, data):
        serializer = URLSafeTimedSerializer(app.config["SECRET_KEY"])
        return serializer.dumps(data)

    @staticmethod
    def verify_token(token, expiration=900):
        serializer = URLSafeTimedSerializer(app.config["SECRET_KEY"])
        try:
            # Deserialize the token with expiration (in seconds)
            data = serializer.loads(token, max_age=expiration)
            return data
        except Exception:
            return None

    def __repr__(self):
        return f"<User {self.id}, {self.username}, {self.email}>"
