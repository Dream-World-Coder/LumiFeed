from datetime import datetime
from app.models import db

class Article(db.Model):
    __tablename__ = "articles"
    id = db.Column(db.Integer, primary_key=True)
    article_title = db.Column(db.String(300), nullable=False)
    article_url = db.Column(db.String(500), nullable=False)
    date_added = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    # Foreign key to collections table and users table
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    
    # connection with collection
    parent_collection = db.Column(db.Integer, db.ForeignKey("collections.id"), nullable=False)

    def __repr__(self):
        return f"<Article title: {self.article_title}, date added: {self.date_added}, collection_id = {self.collection_id}, user_id = {self.user_id}>"
