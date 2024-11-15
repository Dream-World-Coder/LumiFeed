from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from itsdangerous import URLSafeTimedSerializer
from app import app
from app.models import db
from .article import Article
from .collection import Collection
from .utils import user_articles, CollectionType


class User(db.Model, UserMixin):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), nullable=False, unique=True)
    email = db.Column(db.String(128), nullable=False, unique=True)
    password = db.Column(db.String(200), nullable=False)
    email_verified = db.Column(db.Boolean, nullable=False, default=False)
    profile_pic = db.Column(db.String(256), nullable=False, default="images/default-profile.webp")
    last_login = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    ip_address = db.Column(db.String(40), nullable=False)  # IPv6-compatible
    device_info = db.Column(db.Text, nullable=False)
    failed_logins = db.Column(db.SmallInteger, nullable=False, default=0)

    # Relationships
    collections = db.relationship("Collection", backref="owner", lazy=True)
    saved_articles = db.relationship('Article',
                                   secondary=user_articles,
                                   backref=db.backref('saved_by', lazy='dynamic'),
                                   lazy='dynamic')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Create default collections after user creation
        if 'username' in kwargs:  # Only create if it's a new user being created
            db.session.flush()  # This gets us the ID
            self.create_default_collections()

    def create_default_collections(self):
        """Create default Read Later and Liked Articles collections for new user"""
        defaults = [
            ("Read Later", CollectionType.READ_LATER),
            ("Liked Articles", CollectionType.LIKED)
        ]

        for name, col_type in defaults:
            collection = Collection(
                collection_name=name,
                collection_type=col_type,
                user_id=self.id
            )
            db.session.add(collection)

    def save_article(self, article_title, article_url, collection_name):
        """Save an article to a specified collection"""
        # Find or create the collection
        collection = Collection.query.filter_by(
            user_id=self.id,
            collection_name=collection_name
        ).first()

        if not collection:
            if collection_name not in ["Read Later", "Liked Articles"]:
                collection = Collection(
                    collection_name=collection_name,
                    collection_type=CollectionType.CUSTOM,
                    user_id=self.id
                )
                db.session.add(collection)
                db.session.flush()
            else:
                raise ValueError(f"Collection {collection_name} not found")

        # Find existing article or create new one
        article = Article.query.filter_by(article_url=article_url).first()
        if not article:
            article = Article(
                article_title=article_title,
                article_url=article_url
            )
            db.session.add(article)
            db.session.flush()

        # Create the association
        stmt = user_articles.insert().values(
            user_id=self.id,
            article_id=article.id,
            collection_id=collection.id
        )
        db.session.execute(stmt)
        db.session.commit()

        return article

    def get_collection_articles(self, collection_name):
        """Get all articles in a specific collection"""
        return (Article.query
                .join(user_articles)
                .join(Collection)
                .filter(
                    Collection.user_id == self.id,
                    Collection.collection_name == collection_name
                )
                .all())

    def get_all_saved_articles(self):
        """Get all articles saved by the user across all collections"""
        return self.saved_articles.all()

    def create_collection(self, collection_name):
        """
        Create a new custom collection for the user.
        Returns the created collection or raises an error if name already exists.
        """
        # Check if collection name already exists for this user
        existing = Collection.query.filter_by(
            user_id=self.id,
            collection_name=collection_name
        ).first()

        if existing:
            raise ValueError(f"Collection '{collection_name}' already exists")

        # Don't allow creating new collections with reserved names
        if collection_name in ["Read Later", "Liked Articles"]:
            raise ValueError(f"'{collection_name}' is a reserved collection name")

        # Create new collection
        collection = Collection(
            collection_name=collection_name,
            collection_type=CollectionType.CUSTOM,
            user_id=self.id
        )

        db.session.add(collection)
        db.session.commit()

        return collection

    def delete_collection(self, collection_name):
        """
        Delete a user's collection and remove all article associations.
        Returns True if successful, raises error if collection doesn't exist or is default.
        """
        collection = Collection.query.filter_by(
            user_id=self.id,
            collection_name=collection_name
        ).first()

        if not collection:
            raise ValueError(f"Collection '{collection_name}' not found")

        # Don't allow deleting default collections
        if collection.collection_type in [CollectionType.READ_LATER, CollectionType.LIKED]:
            raise ValueError("Cannot delete default collections")

        # Delete all article associations for this collection
        stmt = user_articles.delete().where(
            user_articles.c.collection_id == collection.id,
            user_articles.c.user_id == self.id
        )
        db.session.execute(stmt)

        # Delete the collection
        db.session.delete(collection)
        db.session.commit()

        return True

    def rename_collection(self, old_name, new_name):
        """
        Rename a collection.
        Returns the updated collection or raises an error if names are invalid.
        """
        if old_name in ["Read Later", "Liked Articles"]:
            raise ValueError("Cannot rename default collections")

        if new_name in ["Read Later", "Liked Articles"]:
            raise ValueError("Cannot use reserved collection names")

        collection = Collection.query.filter_by(
            user_id=self.id,
            collection_name=old_name
        ).first()

        if not collection:
            raise ValueError(f"Collection '{old_name}' not found")

        # Check if new name already exists
        existing = Collection.query.filter_by(
            user_id=self.id,
            collection_name=new_name
        ).first()

        if existing:
            raise ValueError(f"Collection '{new_name}' already exists")

        collection.collection_name = new_name
        db.session.commit()

        return collection

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
        serializer = URLSafeTimedSerializer(app.config["SECRET_KEY"])
        return serializer.dumps(data)

    @staticmethod
    def verify_token(token, expiration=900):
        serializer = URLSafeTimedSerializer(app.config["SECRET_KEY"])
        try:
            data = serializer.loads(token, max_age=expiration)
            return data
        except Exception:
            return None

    def __repr__(self):
        return f"<User {self.id}, {self.username}, {self.email}>"
