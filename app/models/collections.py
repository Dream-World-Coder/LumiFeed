from app import app
from app.models import db
from datetime import datetime
from enum import Enum

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
    
    # Relationship with articles
    articles = db.relationship("Article", backref="collection", lazy=True)

    def __repr__(self):
        return f"<Collection {self.collection_name}, User {self.user_id}>"