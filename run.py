from app import app, db
from app.models import User
import os
import threading
import time

# Function to delete unverified users
def delete_unverified_users():
    with app.app_context():
        while True:
            # Delete users where email_verified = False
            deleted_count = User.query.filter_by(email_verified=False).delete()
            db.session.commit()
            if deleted_count > 0:
                print(f"{deleted_count} unverified users deleted.")

            # Wait for 24 hours (86400 seconds) before running again
            time.sleep(86400)

# Start the background thread when the app runs
@app.before_request # before_first_request
def start_cron_job():
    thread = threading.Thread(target=delete_unverified_users)
    thread.daemon = True  # Ensures the thread exits when the main program exits
    thread.start()

# Shell context for Flask CLI
@app.shell_context_processor
def make_shell_context():
    return {"db": db, "User": User}

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    app.run(host="0.0.0.0", port=port)
