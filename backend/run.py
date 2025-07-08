from app import create_app

# from app.models import db
# from app.models.user import User
# from app.models.article import Article
# from app.models.collection import Collection

from dotenv import load_dotenv
import os

load_dotenv()

# app, scheduler = create_app()
app = create_app(configs_dictionary_key='prod')

# Shell context for Flask CLI
# @app.shell_context_processor
# def make_shell_context():
#     return {
#         "db" : db,
#         "User" : User,
#         "Article" : Article,
#         "Collection" : Collection
#     }


if __name__ == "__main__":
    PORT = int(os.environ.get("PORT", 3000))
    HOST = "0.0.0.0"

    # scheduler.start()
    app.run(port=PORT, host=HOST)
