from app.models import db
from flask_login import UserMixin


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
    read_later_articles = db.relationship("Read_later", backref="author", lazy=True)
    saved_articles = db.relationship("Saved_article", backref="author", lazy=True)

    def get_id(self):
        return str(self.id)

    def __repr__(self):
        return f"<User {self.username}, {self.email}, {self.password}>"
