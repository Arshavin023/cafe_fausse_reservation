#!/usr/bin/env python3

"""
Database initialization script for Café Fausse
This script will create all tables with the latest schema
"""

import sys
import os

# Add the Flask-BackEnd directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import create_app
from app.models import db

def init_database():
    """Initialize the database with all tables"""
    app = create_app()
    
    with app.app_context():
        try:
            # Drop all existing tables (BE CAREFUL - this will delete all data)
            print("Dropping existing tables...")
            db.drop_all()
            
            # Create all tables with the latest schema
            print("Creating tables with latest schema...")
            db.create_all()
            
            print("✅ Database initialized successfully!")
            print("Tables created:")
            print("- customers")
            print("- newsletters") 
            print("- reservations")
            
        except Exception as e:
            print(f"❌ Error initializing database: {e}")
            return False
    
    return True

if __name__ == "__main__":
    print("🚀 Initializing Café Fausse Database...")
    success = init_database()
    
    if success:
        print("\n🎉 Database ready! You can now start the Flask server.")
        print("Run: python wgsi.py")
    else:
        print("\n💥 Database initialization failed!")
        sys.exit(1)