from app.models import db


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64))
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    read_later_articles = db.relationship("Read_later", backref="author", lazy=True)
    saved_articles = db.relationship("Saved_article", backref="author", lazy=True)

    def __repr__(self):
        return f"<User {self.username}, {self.email}, {self.password}>"
