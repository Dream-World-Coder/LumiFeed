from app import app
from app.models import User, Read_later, Saved_article

# python functions for routes
from app.functions.news_fetcher import NewsScrape
from app.functions.html_gen import (
    gen_table,
    gen_table_2,
    make_another_page,
    generate_search_reasult,
)
from app.functions.file_functions import makeAlternateFilePath, cleanup_files
from app.functions.search_algorithms import s2x1
from app.functions.news_summariser import generate_summary


obj = NewsScrape()


from app.routes import auth
from app.routes import fetch_news
from app.routes import home
from app.routes import read_news
from app.routes import search
from app.routes import summary
