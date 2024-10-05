from app.models import db
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

from sqlalchemy.ext.mutable import MutableList
from sqlalchemy import PickleType
from datetime import datetime


class User(db.Model, UserMixin):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64))
    email = db.Column(db.String(128), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)
    profile_pic = db.Column(
        db.String(512),
        default="images/default-profile.svg",
    )
    collections = db.Column(
        MutableList.as_mutable(PickleType), default=["Read Later", "Liked Articles"]
    )
    saved_articles = db.relationship("Article", backref="author", lazy=True)

    # New fields to collect user login data
    last_login = db.Column(db.DateTime, default=datetime.utcnow)
    ip_address = db.Column(db.String(45))  # IPv6-compatible
    device_info = db.Column(db.String(256))  # Browser/OS/device information
    failed_logins = db.Column(db.Integer, default=0)  # Count of failed login attempts

    def get_id(self):
        return str(self.id)

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def update_login_data(self, ip_address, device_info):
        """Update the user's login data such as IP and device info on successful login."""
        self.last_login = datetime.utcnow()
        self.ip_address = ip_address
        self.device_info = device_info
        db.session.commit()

    def increment_failed_logins(self):
        """Increment the failed login attempt count."""
        self.failed_logins += 1
        db.session.commit()

    def reset_failed_logins(self):
        """Reset failed login attempts after a successful login."""
        self.failed_logins = 0
        db.session.commit()

    def __repr__(self):
        return f"<User {self.id}, {self.username}, {self.email}>"
