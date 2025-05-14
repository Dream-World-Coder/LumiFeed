from enum import Enum
from . import db

# Enum for CollectionType
class CollectionType(Enum):
    READ_LATER = "read_later"
    LIKED = "liked"
    CUSTOM = "custom"


# Join table: user_articles
user_articles = db.Table(
    'user_articles',
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


# Join table: user_collections
user_collections = db.Table(
    'user_collections',
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


# Join table: article_collections
article_collections = db.Table(
    'article_collections',
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


# Join table: user_article_collections
# involved in add/delete article only
user_article_collections = db.Table(
    'user_article_collections',
    db.Column(
        'user_id',
        db.Integer,
        db.ForeignKey('users.id', name='fk_user_article_collections_user_id'),
        primary_key=True
    ),
    db.Column(
        'article_id',
        db.Integer,
        db.ForeignKey('articles.id', name='fk_user_article_collections_article_id'),
        primary_key=True
    ),
    db.Column(
        'collection_id',
        db.Integer,
        db.ForeignKey('collections.id', name='fk_user_article_collections_collection_id'),
        primary_key=True
    )
)
