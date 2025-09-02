from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, PasswordField, IntegerField, DateTimeField
from wtforms.validators import DataRequired, Length, EqualTo, Optional

class RegistrationForm(FlaskForm):
    email_address = StringField("Email", [Length(min=3, message="Username must be greater than 3 characters."), DataRequired()])
    password = PasswordField("Password", [DataRequired()])
    confirm = PasswordField("Confirm Password", [DataRequired(), EqualTo("password", message="Passwords must match!")])
    submit = SubmitField("Sign Up")
    cancel = SubmitField("Cancel")

class ReservationForm(FlaskForm):
    time_slot = DateTimeField("Time Slot", [DataRequired()])
    guest_name = StringField("Name", [DataRequired()])
    guest_email = StringField("Email", [DataRequired()])
    guest_phone_number = StringField("Phone Number", [Optional()])
    number_of_guests = IntegerField("Number of Guests", [DataRequired()])
    table_number = IntegerField("Table Number", [DataRequired()])
    submit = SubmitField("Submit Reservation")
    cancel = SubmitField("Cancel Reservation")

    