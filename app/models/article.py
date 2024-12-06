from sqlalchemy.orm import dynamic
from app import app
from app.models import db
from datetime import datetime
from .collection import Collection
from .utils import user_article_collections, article_collections


class Article(db.Model):
    __tablename__ = "articles"
    id = db.Column(db.Integer, primary_key=True)
    article_title = db.Column(db.String(300), nullable=False)
    article_url = db.Column(db.String(500), nullable=False, unique=True)
    date_added = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    # relations
    users_who_saved_it = db.relationship(
        'User',
        secondary=user_article_collections,
        back_populates='saved_articles',
        lazy='dynamic'
    )
    collections_where_it_is_saved = db.relationship(
        'Collection',
        secondary=article_collections,
        back_populates='articles',
        lazy='dynamic'
    )

    def __repr__(self):
        return f"<Article title: {self.article_title[:50]}..., date added: {self.date_added}>"
