from app import app
from app.models import db
from datetime import datetime

class Article(db.Model):
    __tablename__ = "articles"
    id = db.Column(db.Integer, primary_key=True)
    article_title = db.Column(db.String(300), nullable=False)
    article_url = db.Column(db.String(500), nullable=False)
    date_added = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    # Foreign keys
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", name="article_user_id"), nullable=False)
    parent_collection = db.Column(db.Integer, db.ForeignKey("collections.id", name="article_collection_id"), nullable=False)

    def __repr__(self):
        return f"<Article title: {self.article_title}, date added: {self.date_added}, collection_id = {self.parent_collection}, user_id = {self.user_id}>"
