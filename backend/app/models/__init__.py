from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = Migrate()

def init_app(app: Flask):
    db.init_app(app)
    migrate.init_app(app, db)

    from .user import User
    from .article import Article
    from .collection import Collection
    from .utils import CollectionType, user_article_collections, user_collections

    with app.app_context():
        db.create_all()



'''
def get_collections_for_user(self, user_id):
    """Get all collections this article is in for a specific user"""
    return (Collection.query
            .join(user_articles)
            .filter(
                user_articles.c.article_id == self.id,
                user_articles.c.user_id == user_id
            )
            .all())
'''
