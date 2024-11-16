from enum import Enum
from app.models import db

user_articles = db.Table(
    'user_articles',
    db.Column('id', db.Integer, primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('article_id', db.Integer, db.ForeignKey('articles.id'), primary_key=True)
)

user_collections = db.Table(
    'user_collections',
    db.Column('id', db.Integer, primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('collection_id', db.Integer, db.ForeignKey('collections.id'), primary_key=True)
)

article_collections = db.Table(
    'article_collections',
    db.Column('id', db.Integer, primary_key=True),
    db.Column('article_id', db.Integer, db.ForeignKey('articles.id'), primary_key=True),
    db.Column('collection_id', db.Integer, db.ForeignKey('collections.id'), primary_key=True)
)

class CollectionType(Enum):
    READ_LATER = "read_later"
    LIKED = "liked"
    CUSTOM = "custom"


# stmt = user_articles.delete().where(
    # user_articles.c.collection_id == collection.id,
    # user_articles.c.user_id == self.id
# )
# db.session.execute(stmt)
