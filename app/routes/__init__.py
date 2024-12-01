from app import app, db, mail
from ..models import User, Article, Collection, CollectionType
from ..forms import LoginForm, RegistrationForm

# utility functions
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
from ..functions.NEWS_SCRAPER import NewsScrape
from ..functions.html_generator import (
    gen_table,
    gen_table_india_news,
    make_another_page,
    generate_search_reasult,
    make_collection,
)
from ..functions.file_management import makeAlternateFilePath, cleanup_files
from ..functions.search_algorithms import s1, s2, s2x1, s3
from ..functions.summariser import generate_summary

obj = NewsScrape()


# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
from ..routes._routes__auth import (
    login,
    register,
    logout,
    resend,
    delete_account,
    forgot_password,
    reset_password,
)
from ..routes._routes__collections_related import add_new_collection, delete_collection, share_collection
from ..routes._routes__fetch_news import fetchnews
from ..routes._routes__home import (
    index,
    about,
    contact,
    profile,
    anything,
    create_tables,
)
from ..routes._routes__read import (
    read_news_here,
    read_news_in_new_tab,
)
from ..routes._routes__remove_article import remove_article
from ..routes._routes__save_articles import (
    add_to_read_later,
    add_to_different_collections,
)
from ..routes._routes__search import search_in_title
from ..routes._routes__summary import make_summary, reset_user_credits
