from app import app, db
from app.models import User, Article, Collection
import os
import threading
import time

# Function to delete unverified users
def delete_unverified_users():
  with app.app_context():
    while True:
      time.sleep(86400)
      deleted_count = User.query.filter_by(email_verified=False).delete()
      db.session.commit()
      if deleted_count > 0:
        print(f"\n\n\n{deleted_count} unverified users deleted.\n\n\n")

# # Start the background thread when the app runs
@app.before_request # before_first_request
def start_cron_job():
  thread = threading.Thread(target=delete_unverified_users)
  thread.daemon = True  # Ensures the thread exits when the main program exits
  thread.start()

# Shell context for Flask CLI
@app.shell_context_processor
def make_shell_context():
  return {"db": db, "User": User, "Article":Article, "Collection":Collection}

if __name__ == "__main__":
  port = int(os.environ.get("PORT", 8000))
  app.run(host="0.0.0.0", port=port)
