# from flask import Flask
# from .routes import main

# def create_app():
#     app = Flask(__name__)
#     app.register_blueprint(main)  # Register routes
#     return app

from flask import Flask
from flask_cors import CORS
from .routes import main
from .db_config.db_config import read_db_config
from .models import db, DATABASE_URL

def create_app():
    # Load configuration
    db_config = read_db_config()
    SECRET_KEY = db_config['reservationapp_secret_key']

    # Create the Flask application instance
    app = Flask(__name__)

    # Configure the app with the SECRET_KEY and SQLAlchemy URI
    app.config['SECRET_KEY'] = SECRET_KEY
    app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize extensions
    db.init_app(app)
    CORS(app)  # Enable CORS for React frontend

    # Register blueprints for routes
    app.register_blueprint(main)

    return app