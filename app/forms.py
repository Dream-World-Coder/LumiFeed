# forms.py
from flask_wtf import FlaskForm
from wtforms import RadioField, IntegerField, StringField, SubmitField
from wtforms.validators import InputRequired, NumberRange, DataRequired


class NewsForm(FlaskForm):
    news_type = RadioField(
        "News Type",
        choices=[
            ("top_n", "Top News"),
            ("india_n", "India News"),
            ("city_n", "City News"),
        ],
        validators=[InputRequired()],
        render_kw={"class": "border"},
    )

    news_count = IntegerField(
        "Num of News to Fetch",
        validators=[InputRequired(), NumberRange(min=1, max=300)],
        render_kw={
            "aria-valuemax": "300",
            "aria-valuemin": "1",
            "aria-valuenow": "1",
            "id": "news_count",
            "min": "1",
            "max": "300",
        },
    )

    city_choice = RadioField(
        "City Choice",
        choices=[
            ("kolkata", "Kolkata"),
            ("bangalore", "Bangalore"),
            ("delhi", "Delhi"),
            ("mumbai", "Mumbai"),
            ("lucknow", "Lucknow"),
        ],
        render_kw={"class": "city_op flexed"},
    )

    submit = SubmitField("Fetch", render_kw={"class": "btn"})
    reset = SubmitField("Reset", render_kw={"class": "btn", "type": "reset"})


class SearchForm(FlaskForm):
    search_part = StringField("Search in News Titles", validators=[DataRequired()])
    submit = SubmitField("Search")
