from app import app, db, mail
from ..models import User, Article, Collection, CollectionType, user_article_collections, user_collections

# utility functions
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
from ..functions.NEWS_SCRAPER_API import NewsScrape
from ..functions.html_generator import (
    generate_search_reasult,
    make_collection,
)
from ..functions.file_management import makeAlternateFilePath, cleanup_files
from ..functions.search_algorithms import s1, s2, s2x1, s3
from ..functions.summariser import generate_summary

obj = NewsScrape()

from ._api_fetch_news import fetchnews__API
from ._api_fetch_article import fetch_article__API
