from app import db

from .user import User
from .article import Article
from .collections import Collection

"""
    I am using One to Many Relationship in my tables.
    1 user can save Multiple Article,
    & 1 user can have multiple collections.
    And for Articles, 1 Aricle will haev one Collection, 
    But 1 collection can have multiple articles.
    
    Here duplications will occur but my application is small and topics are also 
    that way, so it will be pretty rare.
"""