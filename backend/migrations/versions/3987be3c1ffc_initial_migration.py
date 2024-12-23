"""initial migration

Revision ID: 3987be3c1ffc
Revises: 
Create Date: 2024-12-13 11:47:52.763997

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3987be3c1ffc'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('articles',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('article_title', sa.String(length=300), nullable=False),
    sa.Column('article_url', sa.String(length=500), nullable=False),
    sa.Column('date_added', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('article_url')
    )
    op.create_table('collections',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('collection_name', sa.String(length=100), nullable=False),
    sa.Column('collection_type', sa.Enum('READ_LATER', 'LIKED', 'CUSTOM', name='collectiontype'), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('collection_name')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=64), nullable=False),
    sa.Column('email', sa.String(length=128), nullable=False),
    sa.Column('password', sa.String(length=200), nullable=False),
    sa.Column('email_verified', sa.Boolean(), nullable=False),
    sa.Column('profile_pic', sa.String(length=256), nullable=False),
    sa.Column('ip_address', sa.String(length=40), nullable=False),
    sa.Column('device_info', sa.Text(), nullable=False),
    sa.Column('last_login', sa.DateTime(), nullable=False),
    sa.Column('failed_logins', sa.SmallInteger(), nullable=False),
    sa.Column('used_credits', sa.SmallInteger(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('article_collections',
    sa.Column('article_id', sa.Integer(), nullable=False),
    sa.Column('collection_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['article_id'], ['articles.id'], name='fk_article_collections_article_id'),
    sa.ForeignKeyConstraint(['collection_id'], ['collections.id'], name='fk_article_collections_collection_id'),
    sa.PrimaryKeyConstraint('article_id', 'collection_id')
    )
    op.create_table('user_article_collections',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('article_id', sa.Integer(), nullable=False),
    sa.Column('collection_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['article_id'], ['articles.id'], name='fk_user_article_collections_article_id'),
    sa.ForeignKeyConstraint(['collection_id'], ['collections.id'], name='fk_user_article_collections_collection_id'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='fk_user_article_collections_user_id'),
    sa.PrimaryKeyConstraint('user_id', 'article_id', 'collection_id')
    )
    op.create_table('user_articles',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('article_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['article_id'], ['articles.id'], name='fk_user_articles_article_id'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='fk_user_articles_user_id'),
    sa.PrimaryKeyConstraint('user_id', 'article_id')
    )
    op.create_table('user_collections',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('collection_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['collection_id'], ['collections.id'], name='fk_user_collections_collection_id'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='fk_user_collections_user_id'),
    sa.PrimaryKeyConstraint('user_id', 'collection_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_collections')
    op.drop_table('user_articles')
    op.drop_table('user_article_collections')
    op.drop_table('article_collections')
    op.drop_table('users')
    op.drop_table('collections')
    op.drop_table('articles')
    # ### end Alembic commands ###