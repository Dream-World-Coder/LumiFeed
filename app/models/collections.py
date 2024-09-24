from app.models import db


class Collections(db.Model):
    __tablename__ = "collections"
    id = db.Column(db.Integer, primary_key=True)
    collection_name = db.Column(db.String(100), unique=True, nullable=False)

    def __repr__(self):
        return f"<Collections {self.id}>"
