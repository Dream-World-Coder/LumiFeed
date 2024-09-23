from app import app, db  # NewsForm, SearchForm
from app.models import User, Article

# python functions for routes
from app.functions.NEWS_SCRAPER import NewsScrape
from app.functions.html_generator import (
    gen_table,
    gen_table_india_news,
    make_another_page,
    generate_search_reasult,
    make_collection,
    # make_collection_li,
)
from app.functions.file_management import makeAlternateFilePath, cleanup_files
from app.functions.search_algorithms import s1, s2, s2x1, s3
from app.functions.summariser import generate_summary


obj = NewsScrape()


from app.routes import _routes__auth
from app.routes import _routes__collections_related
from app.routes import _routes__fetch_news
from app.routes import _routes__home
from app.routes import _routes__read
from app.routes import _routes__remove_article
from app.routes import _routes__save_articles
from app.routes import _routes__search
from app.routes import _routes__summary
