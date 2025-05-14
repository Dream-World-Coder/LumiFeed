from flask_login import UserMixin
from sqlalchemy.orm import aliased
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from itsdangerous import URLSafeTimedSerializer
from copy import Error
import os
from dotenv import load_dotenv

from . import db
from .article import Article
from .collection import Collection
from .utils import user_article_collections, user_collections, CollectionType

load_dotenv()

class User(db.Model, UserMixin):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), nullable=False, unique=True)
    email = db.Column(db.String(128), nullable=False, unique=True)
    password = db.Column(db.String(200), nullable=False)
    email_verified = db.Column(db.Boolean, nullable=False, default=False)
    profile_pic = db.Column(db.String(256), nullable=False, default="images/default-profile.webp")
    ip_address = db.Column(db.String(40), nullable=False)  # IPv6-compatible
    device_info = db.Column(db.Text, nullable=False)
    last_login = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    failed_logins = db.Column(db.SmallInteger, nullable=False, default=0)
    total_credits = 10
    used_credits = db.Column(db.SmallInteger, nullable=False, default=0)


    # Relationships
    saved_articles = db.relationship(
        'Article',
        secondary=user_article_collections,
        back_populates='users_who_saved_it',
        lazy='dynamic',
        # overlaps="articles,collections_where_it_is_saved"
    )
    collections = db.relationship(
        'Collection',
        secondary=user_collections,
        back_populates='users_who_own_it',
        lazy='dynamic'
    )

    # def __init__(self, *args, **kwargs):
    #     super().__init__(*args, **kwargs)
    #     # Create default collections after user creation
    #     if 'username' in kwargs:  # Only create if it's a new user being created
    #         db.session.flush()  # This gets us the ID
    #         self.create_default_collections()

    def create_default_collections(self):
        """Create default Read Later and Liked Articles collections for new user"""
        defaults = [
            ("Read Later", CollectionType.READ_LATER),
            ("Liked Articles", CollectionType.LIKED)
        ]

        for name, col_type in defaults:
            collection = Collection(
                collection_name=name,
                collection_type=col_type
            )
            self.collections.append(collection)
            db.session.commit()


    def all_articles_in_collection(self, collection_id):
        """
        Get all articles of the user in a specific collection.
        """
        # Aliases for tables
        user_alias = aliased(self.__class__)
        article_alias = aliased(Article)
        collection_alias = aliased(Collection)

        # Query
        result = (
            db.session.query(
                # user_alias.username,
                article_alias.article_title.label('article_title'),
                article_alias.article_url.label('article_url'),
                collection_alias.collection_name.label('collection_name')
            )
            .select_from(user_alias)
            .join(user_article_collections, user_article_collections.c.user_id == user_alias.id)
            .join(article_alias, user_article_collections.c.article_id == article_alias.id)
            .join(collection_alias, user_article_collections.c.collection_id == collection_id)
            .filter(user_alias.id == self.id)
            .filter(collection_alias.id == collection_id)
            .distinct()
        )

        return result.all()


    def save_article(self, article_title, article_url, collection_name):
        # check collection
        collection = Collection.query.filter_by(collection_name=collection_name).first()
        # print(f'collection found, {collection}')

        if not collection:
            raise ValueError("Error, this collection doesnot exist.")

        if collection not in self.collections.all():
            raise Error(f"collection {collection} does not exist, create one.")

        # Find existing article or create new one
        article = Article.query.filter_by(article_url=article_url).first()
        # print(f'article = {article}')
        if not article:
            # print('article not found')
            article = Article(article_title=article_title, article_url=article_url)
            db.session.add(article)
            db.session.flush()
            # print('article added')

        # article alredy saved check
        existing = db.session.query(user_article_collections)\
            .filter_by(user_id=self.id, article_id=article.id, collection_id=collection.id)\
            .first()

        if existing:
            return -1

        # print("Article is addable")

        # Add article to collection
        db.session.execute(
            user_article_collections.insert().values(
                user_id=self.id,
                article_id=article.id,
                collection_id=collection.id
            )
        )
        db.session.commit()
        # print('article saved')

        return article


    # unchecked, made by codeium -- do not use now
    def remove_article(self, article_url, collection_name):
        # check collection
        collection = Collection.query.filter_by(collection_name=collection_name).first()
        # print(f'collection found, {collection}')

        if not collection:
            raise ValueError("Error, this collection doesnot exist.")

        if collection not in self.collections.all():
            raise Error(f"collection {collection} does not exist, create one.")

        # Find existing article or create new one
        article = Article.query.filter_by(article_url=article_url).first()
        # print(f'article = {article}')
        if not article:
            # print('article not found')
            return -1

        # article alredy saved check
        existing = db.session.query(user_article_collections)\
            .filter_by(user_id=self.id, article_id=article.id, collection_id=collection.id)\
            .first()

        if not existing:
            return -1

        # print("Article is addable")

        # Add article to collection
        db.session.execute(
            user_article_collections.delete().where(
                user_article_collections.c.user_id == self.id,
                user_article_collections.c.article_id == article.id,
                user_article_collections.c.collection_id == collection.id
            )
        )
        db.session.commit()
        # print('article removed')

        return article


    # old methods, do not use
    def create_collection(self, collection_name):
        """
        Create a new custom collection for the user.
        Returns the created collection or raises an error if name already exists.
        """
        # Check if collection name already exists for this user
        existing = Collection.query.filter_by(collection_name=collection_name).first()

        if existing:
            raise ValueError(f"Collection '{collection_name}' already exists")

        # Don't allow creating new collections with reserved names
        if collection_name in ["Read Later", "Liked Articles"]:
            raise ValueError(f"'{collection_name}' is a reserved collection name")

        # Create new collection
        collection = Collection(collection_name=collection_name, collection_type=CollectionType.CUSTOM,)
        db.session.add(collection)
        db.session.flush()

        self.collections.append(collection)
        db.session.commit()

        return collection


    # old methods, do not use
    def delete_collection(self, collection_name):
        """
        Delete a user's collection and remove all article associations.
        Returns True if successful, raises error if collection doesn't exist or is default.
        """
        collection = Collection.query.filter_by(collection_name=collection_name).first()

        if not collection:
            raise ValueError(f"Collection '{collection_name}' not found")

        # Don't allow deleting default collections
        if collection.collection_type in [CollectionType.READ_LATER, CollectionType.LIKED]:
            raise ValueError("Cannot delete default collections")

        # Delete all article associations for this collection
        for article in self.saved_articles.all():
            if article.collections_where_it_is_saved.filter_by(collection_name=collection).first():
                self.saved_articles.remove(article)

        # Delete the collection
        self.collections.remove(collection)
        db.session.commit()

        return True


    # Authentication methods
    def get_id(self):
        return str(self.id)

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def update_login_data(self, ip_address, device_info):
        """Update the user's login data such as IP and device info on successful login."""
        self.last_login = datetime.utcnow()
        self.ip_address = ip_address
        self.device_info = device_info
        db.session.commit()

    def increment_failed_logins(self):
        """Increment the failed login attempt count."""
        self.failed_logins += 1
        db.session.commit()

    def reset_failed_logins(self):
        """Reset failed login attempts after a successful login."""
        self.failed_logins = 0
        db.session.commit()

    def generate_verification_token(self, data):
        serializer = URLSafeTimedSerializer(os.environ.get("SECRET_KEY", os.urandom(512)))
        return serializer.dumps(data)

    @staticmethod
    def verify_token(token, expiration=900):
        serializer = URLSafeTimedSerializer(os.environ.get("SECRET_KEY", os.urandom(512)))
        try:
            data = serializer.loads(token, max_age=expiration)
            return data
        except Exception:
            return None

    def __repr__(self):
        return f"<User id: {self.id}, username: {self.username}, email: {self.email}>"




"""
from sqlalchemy import event
from app,models import db, User, Collection, CollectionType, user_collections

@event.listens_for(User, 'after_insert')
def create_default_collections(mapper, connection, user):
    default_collections = [
        Collection(
            collection_name=f"{user.username}'s Read Later",
            collection_type=CollectionType.READ_LATER.value
        ),
        Collection(
            collection_name=f"{user.username}'s Liked Articles",
            collection_type=CollectionType.LIKED.value
        )
    ]

    # Add collections to database
    for collection in default_collections:
        db.session.add(collection)

    # Flush to get collection IDs
    db.session.flush()

    # Create links in user_collections table
    for collection in default_collections:
        stmt = user_collections.insert().values(
            user_id=user.id,
            collection_id=collection.id
        )
        db.session.execute(stmt)

    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        raise e
"""
