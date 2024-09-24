import unittest
from app import app, db
from app.models import User, Article, Collections


class TestFlaskApp(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///test-database.sqlite"
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_index_route(self):
        response = self.app.get("/")
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"Welcome", response.data)

    def test_register_user(self):
        data = {
            "username": "testuser",
            "email": "testuser@example.com",
            "password": "testpassword",
        }
        response = self.app.post("/register", data=data, follow_redirects=True)
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"Welcome", response.data)
        user = User.query.filter_by(username="testuser").first()
        self.assertIsNotNone(user)
        self.assertEqual(user.email, "testuser@example.com")

    def test_create_collection(self):
        user = User(username="testuser", email="testuser@example.com")
        db.session.add(user)
        db.session.commit()
        data = {"collection_name": "Test Collection"}
        response = self.app.post(
            "/add_new_collection", data=data, follow_redirects=True
        )
        self.assertEqual(response.status_code, 200)
        collection = Collections.query.filter_by(name="Test Collection").first()
        self.assertIsNotNone(collection)
        self.assertEqual(collection.user_id, user.id)


if __name__ == "__main__":
    unittest.main()
