from enum import unique
from app import app
from app.models import db
from datetime import datetime
from .utils import user_collections, article_collections, CollectionType, user_article_collections


class Collection(db.Model):
    __tablename__ = "collections"
    id = db.Column(db.Integer, primary_key=True)
    collection_name = db.Column(db.String(100), nullable=False, unique=True)
    collection_type = db.Column(db.Enum(CollectionType), nullable=False, default=CollectionType.CUSTOM)

    # Relationship
    users_who_own_it = db.relationship(
        'User',
        secondary=user_collections,
        back_populates='collections',
    )
    # articles = db.relationship(
    #     'Article',
    #     secondary=article_collections,
    #     back_populates='collections_where_it_is_saved',
    #     lazy='dynamic'
    # )

    def __repr__(self):
        return f"<Collection {self.collection_name}>"
