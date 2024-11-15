from app import app
from app.models import db
from datetime import datetime
from app.models import Collection

user_articles = db.Table('user_articles',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('article_id', db.Integer, db.ForeignKey('articles.id'), primary_key=True),
    db.Column('collection_id', db.Integer, db.ForeignKey('collections.id'), primary_key=True),
    db.Column('saved_at', db.DateTime, default=datetime.utcnow)
)

class Article(db.Model):
    __tablename__ = "articles"
    id = db.Column(db.Integer, primary_key=True)
    article_title = db.Column(db.String(300), nullable=False)
    article_url = db.Column(db.String(500), nullable=False, unique=True)
    date_added = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def get_collections_for_user(self, user_id):
        """Get all collections this article is in for a specific user"""
        return (Collection.query
                .join(user_articles)
                .filter(
                    user_articles.c.article_id == self.id,
                    user_articles.c.user_id == user_id
                )
                .all())

    def __repr__(self):
        return f"<Article title: {self.article_title}, date added: {self.date_added}>"
