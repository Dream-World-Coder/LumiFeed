from app.models import db
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash


class User(db.Model, UserMixin):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64))
    email = db.Column(db.String(128), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    profile_pic = db.Column(
        db.String(256),
        default="images/default-profile.svg",
    )
    # now i am not restritcing the number of collections users can have
    collections = db.Column(db.PickleType, default=["read_later", "liked_articles"])
    saved_articles = db.relationship("Article", backref="author", lazy=True)

    def get_id(self):
        return str(self.id)

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def __repr__(self):
        return f"<User {self.username}, {self.email}, {self.password}>"
