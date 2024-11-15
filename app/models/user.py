from enum import unique
from app import app
from app.models import db
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.ext.mutable import MutableList
from sqlalchemy import Boolean
from datetime import datetime
from itsdangerous import URLSafeTimedSerializer



class User(db.Model, UserMixin):
  __tablename__ = "users"
  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(64), nullable=False, unique=True)
  email = db.Column(db.String(128), nullable=False, unique=True)
  password = db.Column(db.String(200), nullable=False)
  email_verified = db.Column(db.Boolean, nullable=False, default=False)
  profile_pic = db.Column(db.String(256), nullable=False, default="images/default-profile.webp")
  last_login = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
  ip_address = db.Column(db.String(40), nullable=False)  # IPv6-compatible
  device_info = db.Column(db.Text, nullable=False)
  failed_logins = db.Column(db.SmallInteger, nullable=False, default=0)
  saved_articles = db.relationship("Article", backref="person_who_saved_this", lazy=True)
  collections = db.relationship("Collection", backref="creator_of_the_collection", lazy=True)

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


  def generate_verification_token(self, data):
    serializer = URLSafeTimedSerializer(app.config["SECRET_KEY"])
    return serializer.dumps(data)


  @staticmethod
  def verify_token(token, expiration=900):
    serializer = URLSafeTimedSerializer(app.config["SECRET_KEY"])
    try:
      data = serializer.loads(token, max_age=expiration)
      return data
    except Exception:
      return None


  def __repr__(self):
    return f"<User {self.id}, {self.username}, {self.email}>"
