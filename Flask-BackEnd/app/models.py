from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from app.db_config.db_config import read_db_config

# Load config
db_config = read_db_config()

SECRET_KEY = db_config['reservationapp_secret_key']
DB_USER = db_config['reservationapp_username']
DB_PASSWORD = db_config['reservationapp_password']
DB_HOST = db_config['reservationapp_host']
DB_NAME = db_config['reservationapp_database']

# Correct DATABASE_URL format for synchronous PostgreSQL
DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}"

# ✅ Define db instance here (without binding to app)
db = SQLAlchemy()


class Customer(db.Model):
    __tablename__ = 'customers'

    id = db.Column(db.Integer, primary_key=True)
    email_address = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    customer_name = db.Column(db.String(255), nullable=True)
    phone_number = db.Column(db.String(20))
    newsletter_signup = db.Column(db.Boolean, default=False)

    reservations = db.relationship('Reservation', backref='customer', lazy=True)

    def __repr__(self):
        return f'<Customer {self.email_address}>'


class Reservation(db.Model):
    __tablename__ = 'reservations'

    id = db.Column(db.Integer, primary_key=True)

    # If a customer is not registered, this can be NULL
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'), nullable=True)

    # Guest details for non-registered users
    guest_name = db.Column(db.String(255), nullable=True)
    guest_email = db.Column(db.String(255), nullable=True)
    guest_phone_number = db.Column(db.String(20), nullable=True)

    time_slot = db.Column(db.DateTime, nullable=False)
    table_number = db.Column(db.Integer, nullable=False)
    number_of_guests = db.Column(db.Integer, nullable=False)
