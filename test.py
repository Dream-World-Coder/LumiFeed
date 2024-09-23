# import os
# import sys

# # Add the parent directory to the Python path
# sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

# from app import create_app, db
# from app.models import User, Article, Collection

# app = create_app()


# def test_app_creation():
#     assert app is not None, "App creation failed"
#     print("App creation: OK")


# def test_db_connection():
#     with app.app_context():
#         try:
#             db.engine.connect()
#             print("Database connection: OK")
#         except Exception as e:
#             print(f"Database connection failed: {e}")


# def test_models():
#     with app.app_context():
#         try:
#             # Try to create a test user
#             test_user = User(username="testuser", email="test@example.com")
#             db.session.add(test_user)
#             db.session.commit()
#             print("Model creation: OK")

#             # Clean up
#             db.session.delete(test_user)
#             db.session.commit()
#         except Exception as e:
#             print(f"Model creation failed: {e}")


# def test_routes():
#     # This assumes you have a route at '/' that returns a 200 status code
#     with app.test_client() as client:
#         response = client.get("/")
#         assert (
#             response.status_code == 200
#         ), f"Home route failed with status code {response.status_code}"
#         print("Route test: OK")


# if __name__ == "__main__":
#     test_app_creation()
#     test_db_connection()
#     test_models()
#     test_routes()
#     print("All tests completed.")
import unittest
from app import app, db
from app.models.user import User
from app.models.article import Article


class BasicAppTestCase(unittest.TestCase):

    def setUp(self):
        # Create a test client
        self.app = app.test_client()
        self.app_context = app.app_context()
        self.app_context.push()

        # Create all database tables
        db.create_all()

    def tearDown(self):
        # Remove the database session and drop all tables
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_home_page(self):
        # Test if the home page loads correctly
        response = self.app.get("/")
        self.assertEqual(response.status_code, 200)

    def test_user_login(self):
        # Test if login functionality works (customize based on your actual login route)
        response = self.app.post(
            "/login", data=dict(username="testuser", password="testpass")
        )
        self.assertEqual(response.status_code, 200)

    def test_article_creation(self):
        # Test article creation (customize based on your actual article creation route)
        response = self.app.post(
            "/articles/new",
            data=dict(title="Test Article", content="This is a test article."),
        )
        self.assertEqual(response.status_code, 200)


if __name__ == "__main__":
    unittest.main()
