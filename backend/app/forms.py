from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from flask_login import current_user
from wtforms import StringField, PasswordField, SubmitField, EmailField
from wtforms.validators import DataRequired, Length, Email, EqualTo, ValidationError, Regexp
from app.models.user import User


class RegistrationForm(FlaskForm):
    username = StringField('Username', validators=[
        DataRequired(),
        Length(min=1, max=40),
        Regexp(r'^[A-Za-z0-9-]*$', message="Username must contain only letters, numbers, and hyphens.")
    ])
    email = EmailField('Email', validators=[
        DataRequired(),
        Email(),
        Length(max=128)
    ])
    password = PasswordField('Password', validators=[
        DataRequired(),
        Length(min=8, max=16, message="Password must be 8-16 characters long.")
    ])

class LoginForm(FlaskForm):
    email = EmailField('Email', validators=[
        DataRequired(),
        Email()
    ])
    password = PasswordField('Password', validators=[
        DataRequired()
    ])


class UpdateAccountForm(FlaskForm):
  username = StringField('Username',validators=[DataRequired(), Length(min=2, max=20)])
  email = StringField('Email',validators=[DataRequired(), Email()])
  picture = FileField('Update Profile Picture', validators=[FileAllowed(['jpg', 'png'])])
  submit = SubmitField('Update')

  def validate_username(self, username):
    if username.data != current_user.username:
      user = User.query.filter_by(username=username.data).first()
      if user:
        raise ValidationError('That username is taken. Please choose a different one.')

  def validate_email(self, email):
    if email.data != current_user.email:
      user = User.query.filter_by(email=email.data).first()
      if user:
        raise ValidationError('That email is taken. Please choose a different one.')


class RequestResetForm(FlaskForm):
  email = StringField('Email',validators=[DataRequired(), Email()])
  submit = SubmitField('Request Password Reset')

  def validate_email(self, email):
    user = User.query.filter_by(email=email.data).first()
    if user is None:
      raise ValidationError('There is no account with that email. You must register first.')


class ResetPasswordForm(FlaskForm):
  password = PasswordField('Password', validators=[DataRequired()])
  confirm_password = PasswordField('Confirm Password',validators=[DataRequired(), EqualTo('password')])
  submit = SubmitField('Reset Password')
