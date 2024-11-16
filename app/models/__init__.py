from app import db


from .utils import CollectionType
from .user import User
from .article import Article
from .collection import Collection


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
