from datetime import datetime
from app.models import db


class Article(db.Model):
    __tablename__ = "articles"
    id = db.Column(db.Integer, primary_key=True)
    article_title = db.Column(db.String(300), nullable=False)  # 300 -> 200
    article_url = db.Column(db.String(500), nullable=False, unique=True)  # 500 -> 400
    date_added = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    parent_collection = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    def __repr__(self):
        return f"<Article title: {self.article_title}, date added: {self.date_added}, parent collection = {self.parent_collection}, user_id = {self.user_id}>"
