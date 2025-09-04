#!/usr/bin/env python3

"""
Server startup script for Café Fausse Flask Backend
"""

import sys
import os

# Add the current directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import create_app
from app.models import db

def run_server():
    """Start the Flask development server"""
    app = create_app()
    
    # Create tables if they don't exist
    with app.app_context():
        try:
            db.create_all()
            print("✅ Database tables verified/created")
        except Exception as e:
            print(f"⚠️  Database warning: {e}")
    
    print("🚀 Starting Café Fausse Flask Server...")
    print("📍 Server will be available at: http://localhost:5000")
    print("🔗 API endpoints available at: http://localhost:5000/api/")
    print("\n📋 Available API endpoints:")
    print("- GET  /api/health                     # Health check")
    print("- POST /api/customers/register         # Register new customer")
    print("- GET  /api/customers/<email>          # Get customer by email")  
    print("- POST /api/reservations               # Create reservation")
    print("- GET  /api/reservations               # Get all reservations")
    print("- POST /api/newsletter                 # Subscribe to newsletter")
    print("- POST /api/newsletter/unsubscribe     # Unsubscribe from newsletter")
    print("- GET  /api/newsletter/status/<email>  # Check newsletter status")
    print("\n🛑 Press Ctrl+C to stop the server")
    print("-" * 50)
    
    # Run the development server
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True
    )

if __name__ == "__main__":
    run_server()