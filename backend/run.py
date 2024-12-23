from app import app, db, scheduler
from app.models import User, Article, Collection
import os


# Shell context for Flask CLI
@app.shell_context_processor
def make_shell_context():
  return {
    "db": db, 
    "User": User, 
    "Article":Article, 
    "Collection":Collection
  }


if __name__ == "__main__":
  scheduler.start() # debug should be False for this, else it starts many times when reloading for debug mode
  # thats why turning off the debug mode for all
  port = int(os.environ.get("PORT", 8000))
  app.run(host="0.0.0.0", port=port)
