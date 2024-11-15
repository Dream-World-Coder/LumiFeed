from enum import Enum
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from itsdangerous import URLSafeTimedSerializer
from app import app
from app.models import db

class CollectionType(Enum):
    READ_LATER = "read_later"
    LIKED = "liked"
    CUSTOM = "custom"

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
    saved_articles = db.relationship("Article", backref="saved_by", lazy=True)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Create default collections after user creation
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
        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            raise e

    def save_article(self, article_title, article_url, collection_name):
        """Save an article to a specified collection"""
        collection = Collection.query.filter_by(
            user_id=self.id,
            collection_name=collection_name
        ).first()
        
        if not collection:
            # Create new collection if it doesn't exist (for custom collections)
            if collection_name not in ["Read Later", "Liked Articles"]:
                collection = Collection(
                    collection_name=collection_name,
                    collection_type=CollectionType.CUSTOM,
                    user_id=self.id
                )
                db.session.add(collection)
                db.session.commit()
            else:
                raise ValueError(f"Collection {collection_name} not found")

        # Create new article
        article = Article(
            article_title=article_title,
            article_url=article_url,
            user_id=self.id,
            parent_collection=collection.id
        )
        
        db.session.add(article)
        db.session.commit()
        return article

    def get_collection_articles(self, collection_name):
        """Get all articles in a specific collection"""
        collection = Collection.query.filter_by(
            user_id=self.id,
            collection_name=collection_name
        ).first()
        
        if collection:
            return Article.query.filter_by(parent_collection=collection.id).all()
        return []

    def get_all_saved_articles(self):
        """Get all articles saved by the user across all collections"""
        return Article.query.filter_by(user_id=self.id).all()

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
