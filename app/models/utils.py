from enum import Enum
from app.models import db

# Association table for users and articles (saved articles)
user_articles = db.Table('user_articles',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('article_id', db.Integer, db.ForeignKey('articles.id'), primary_key=True),
    db.Column('collection_id', db.Integer, db.ForeignKey('collections.id'), primary_key=True),
    db.Column('saved_at', db.DateTime, default=db.func.now())
)

class CollectionType(Enum):
    READ_LATER = "read_later"
    LIKED = "liked"
    CUSTOM = "custom"
