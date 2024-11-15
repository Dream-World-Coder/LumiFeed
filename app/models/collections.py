from app.models import db
from sqlalchemy.orm import relationship

class Collection(db.Model):
    __tablename__ = "collections"
    id = db.Column(db.Integer, primary_key=True)
    collection_name = db.Column(db.String(100), nullable=False)

    # Link the collection to the user who owns it
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user = relationship("User", backref="collections", lazy=True)

    # Relationship with Article
    articles = relationship("Article", backref="collection", lazy=True, cascade="all, delete-orphan")

    # Custom constraint for default collections
    __table_args__ = (
        db.UniqueConstraint('user_id', 'collection_name', name='unique_user_collection'),
    )

    def __init__(self, collection_name, user_id):
        self.collection_name = collection_name
        self.user_id = user_id

    def __repr__(self):
        return f"<Collection {self.collection_name}, User {self.user_id}>"
