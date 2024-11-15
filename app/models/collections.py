from app import app
from app.models import db
from datetime import datetime
from enum import Enum

user_articles = db.Table('user_articles',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('article_id', db.Integer, db.ForeignKey('articles.id'), primary_key=True),
    db.Column('collection_id', db.Integer, db.ForeignKey('collections.id'), primary_key=True),
    db.Column('saved_at', db.DateTime, default=datetime.utcnow)
)

class CollectionType(Enum):
    READ_LATER = "read_later"
    LIKED = "liked"
    CUSTOM = "custom"

class Collection(db.Model):
    __tablename__ = "collections"
    id = db.Column(db.Integer, primary_key=True)
    collection_name = db.Column(db.String(100), nullable=False)
    collection_type = db.Column(db.Enum(CollectionType), nullable=False, default=CollectionType.CUSTOM)

    # Foreign key to user
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", name="collection_user_id"), nullable=False)

    # Relationship with articles through association table
    articles = db.relationship('Article',
                             secondary=user_articles,
                             backref=db.backref('collections', lazy='dynamic'),
                             lazy='dynamic')

    def __repr__(self):
        return f"<Collection {self.collection_name}, User {self.user_id}>"
