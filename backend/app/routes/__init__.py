from flask import Flask
from flask_mail import Mail

mail = Mail()


def init_app(app:Flask):
    mail.init_app(app)

    from .home import main_bp
    from .fetch_news import fetchnews_bp
    from .search import search_bp
    from .auth import auth_bp
    from .profile import profile_bp
    from .articles import article_bp
    from .collections import collection_bp
    from .summary import summary_bp

    from .api.auth import auth_api_bp
    from .api.fetch_news import fetchnews_api_bp
    from .api.articles import articles_api_bp

    app.register_blueprint(main_bp, url_prefix='')
    app.register_blueprint(fetchnews_bp, url_prefix='')
    app.register_blueprint(search_bp, url_prefix='')
    app.register_blueprint(auth_bp, url_prefix='')
    app.register_blueprint(profile_bp, url_prefix='')
    app.register_blueprint(article_bp, url_prefix='')
    app.register_blueprint(collection_bp, url_prefix='')
    app.register_blueprint(summary_bp, url_prefix='')

    app.register_blueprint(auth_api_bp, url_prefix='/api')
    app.register_blueprint(fetchnews_api_bp, url_prefix='/api')
    app.register_blueprint(articles_api_bp, url_prefix='/api')
