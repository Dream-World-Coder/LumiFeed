from app import app, db  # NewsForm, SearchForm
from app.models import User, Read_later, Saved_article

# python functions for routes
from app.functions.NEWS_SCRAPER import NewsScrape
from app.functions.html_generator import (
    gen_table,
    gen_table_india_news,
    make_another_page,
    generate_search_reasult,
)
from app.functions.file_management import makeAlternateFilePath, cleanup_files
from app.functions.search_algorithms import s2x1
from app.functions.summariser import generate_summary


obj = NewsScrape()


from app.routes import _routes__auth
from app.routes import _routes__fetch_news
from app.routes import _routes__home
from app.routes import _routes__read
from app.routes import _routes__search
from app.routes import _routes__summary
