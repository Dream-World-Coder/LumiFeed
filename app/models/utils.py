from enum import Enum
from app.models import db

user_articles = db.Table(
    'user_articles',
    db.metadata,
    db.Column('id', db.Integer, primary_key=True),
    db.Column(
        'user_id',
        db.Integer,
        db.ForeignKey('users.id', name='fk_user_articles_user_id'),
        primary_key=True
    ),
    db.Column(
        'article_id',
        db.Integer,
        db.ForeignKey('articles.id', name='fk_user_articles_article_id'),
        primary_key=True
    )
)

user_collections = db.Table(
    'user_collections',
    db.metadata,
    db.Column('id', db.Integer, primary_key=True),
    db.Column(
        'user_id',
        db.Integer,
        db.ForeignKey('users.id', name='fk_user_collections_user_id'),
        primary_key=True
    ),
    db.Column(
        'collection_id',
        db.Integer,
        db.ForeignKey('collections.id', name='fk_user_collections_collection_id'),
        primary_key=True
    )
)

article_collections = db.Table(
    'article_collections',
    db.metadata,
    db.Column('id', db.Integer, primary_key=True),
    db.Column(
        'article_id',
        db.Integer,
        db.ForeignKey('articles.id', name='fk_article_collections_article_id'),
        primary_key=True
    ),
    db.Column(
        'collection_id',
        db.Integer,
        db.ForeignKey('collections.id', name='fk_article_collections_collection_id'),
        primary_key=True
    )
)

class CollectionType(Enum):
    READ_LATER = "read_later"
    LIKED = "liked"
    CUSTOM = "custom"

# For the delete statement you mentioned, assuming you want to delete user articles:
# stmt = user_articles.delete().where(
#     user_articles.c.user_id == self.id,
#     user_articles.c.article_id == article.id  # Assuming you want to delete specific article
# )
# db.session.execute(stmt)
