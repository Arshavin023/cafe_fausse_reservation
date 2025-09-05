from flask import request, Blueprint, jsonify
from .models import db, Customer, Reservation, Newsletter
import random
from datetime import datetime
import re
from werkzeug.security import generate_password_hash

main = Blueprint("main", __name__)

# Helper Functions
def validate_email(email):
    """Checks if the email is in a valid format."""
    email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(email_pattern, email)

def get_customer_by_email(email):
    """Finds a customer by their email address."""
    return Customer.query.filter_by(email_address=email).first()

def get_newsletter_by_email(email):
    """Finds a newsletter subscription by email."""
    return Newsletter.query.filter_by(email=email).first()

# API Endpoints for React Frontend
@main.route("/api/reservations", methods=['POST'])
def create_reservation_api():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['customerName', 'customerEmail', 'timeSlot', 'numberOfGuests']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        # Validate email format
        if not validate_email(data['customerEmail']):
            return jsonify({'error': 'Invalid customer email format'}), 400
            
        # Check if customer exists
        customer = get_customer_by_email(data['customerEmail'])
        
        # Assign random table (simulate table availability check)
        table_number = random.randint(1, 30)
        
        # Handle customer creation if 'saveCustomerInfo' is true and customer doesn't exist
        if not customer and data.get('saveCustomerInfo', False):
            # Create new customer
            new_customer = Customer(
                email_address=data['customerEmail'],
                customer_name=data['customerName'],
                phone_number=data.get('phoneNumber', ''),
                newsletter_signup=False
            )
            db.session.add(new_customer)
            db.session.flush()
            customer = new_customer
        
        # Create reservation
        if customer:
            # Existing customer or newly created customer - link via customer_id
            new_reservation = Reservation(
                time_slot=datetime.fromisoformat(data['timeSlot'].replace('Z', '+00:00')),
                number_of_guests=int(data['numberOfGuests']),
                table_number=table_number,
                customer_id=customer.id
            )
        else:
            # Guest reservation - store guest details directly
            new_reservation = Reservation(
                time_slot=datetime.fromisoformat(data['timeSlot'].replace('Z', '+00:00')),
                number_of_guests=int(data['numberOfGuests']),
                table_number=table_number,
                guest_name=data['customerName'],
                guest_email=data['customerEmail'],
                guest_phone_number=data.get('phoneNumber', '')
            )
        
        db.session.add(new_reservation)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Reservation created successfully',
            'reservation': {
                'id': new_reservation.id,
                'table_number': table_number,
                'customer_name': data['customerName'],
                'time_slot': data['timeSlot'],
                'number_of_guests': data['numberOfGuests']
            }
        }), 201
        
    except Exception as e:
        db.session.rollback()
        # Log the full error for debugging, but return a generic message
        print(f"Error creating reservation: {e}")
        return jsonify({'error': 'Failed to create reservation due to an internal server error.'}), 500

@main.route("/api/newsletter", methods=['POST'])
def newsletter_signup_api():
    try:
        data = request.get_json()
        email = data.get('email')
        
        if not email or not validate_email(email):
            return jsonify({'error': 'A valid email is required'}), 400
        
        newsletter_record = get_newsletter_by_email(email)
        customer = get_customer_by_email(email)

        # Update or create the Newsletter record
        if newsletter_record:
            if newsletter_record.newsletter_signup:
                return jsonify({
                    'success': False,
                    'message': 'Email is already subscribed to newsletter'
                }), 400
            else:
                newsletter_record.newsletter_signup = True
        else:
            new_newsletter_record = Newsletter(email=email, newsletter_signup=True)
            db.session.add(new_newsletter_record)
        
        # Update customer table if they exist
        if customer:
            customer.newsletter_signup = True
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Successfully subscribed to newsletter'
        }), 200
        
    except Exception as e:
        db.session.rollback()
        print(f"Error subscribing to newsletter: {e}")
        return jsonify({'error': 'Failed to subscribe due to an internal server error.'}), 500

@main.route("/api/newsletter/unsubscribe", methods=['POST'])
def newsletter_unsubscribe_api():
    try:
        data = request.get_json()
        email = data.get('email')
        
        if not email or not validate_email(email):
            return jsonify({'error': 'A valid email is required'}), 400
        
        newsletter_record = get_newsletter_by_email(email)
        customer = get_customer_by_email(email)
        
        # Check if email is in either table and is currently subscribed
        is_subscribed = (newsletter_record and newsletter_record.newsletter_signup) or \
                        (customer and customer.newsletter_signup)
        
        if not is_subscribed:
            return jsonify({
                'success': False,
                'message': 'Email is not currently subscribed to newsletter'
            }), 400
        
        # Update both tables
        if newsletter_record:
            newsletter_record.newsletter_signup = False
        
        if customer:
            customer.newsletter_signup = False
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Successfully unsubscribed from newsletter'
        }), 200
        
    except Exception as e:
        db.session.rollback()
        print(f"Error unsubscribing from newsletter: {e}")
        return jsonify({'error': 'Failed to unsubscribe due to an internal server error.'}), 500

@main.route("/api/newsletter/status/<email>", methods=['GET'])
def newsletter_status_api(email):
    try:
        if not validate_email(email):
            return jsonify({'error': 'Invalid email format'}), 400
        
        newsletter_record = get_newsletter_by_email(email)
        customer = get_customer_by_email(email)
        
        is_subscribed = (newsletter_record and newsletter_record.newsletter_signup) or \
                        (customer and customer.newsletter_signup)
        
        return jsonify({
            'email': email,
            'is_subscribed': is_subscribed,
            'exists_in_newsletter_table': newsletter_record is not None,
            'exists_in_customer_table': customer is not None
        }), 200
        
    except Exception as e:
        print(f"Error checking newsletter status: {e}")
        return jsonify({'error': 'Failed to check subscription status due to an internal server error.'}), 500

@main.route("/api/customers/<email>", methods=['GET'])
def get_customer_api(email):
    try:
        customer = get_customer_by_email(email)
        
        if not customer:
            return jsonify({'error': 'Customer not found'}), 404
        
        return jsonify({
            'success': True,
            'customer': {
                'id': customer.id,
                'name': customer.customer_name,
                'email': customer.email_address,
                'phone': customer.phone_number,
                'newsletter_signup': customer.newsletter_signup
            }
        }), 200
        
    except Exception as e:
        print(f"Error fetching customer: {e}")
        return jsonify({'error': 'Failed to fetch customer due to an internal server error.'}), 500

@main.route("/api/customers/register", methods=['POST'])
def register_customer_api():
    try:
        data = request.get_json()
        
        required_fields = ['email', 'name']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        if not validate_email(data['email']):
            return jsonify({'error': 'Invalid email format'}), 400
            
        existing_customer = get_customer_by_email(data['email'])
        if existing_customer:
            return jsonify({'error': 'Customer already exists'}), 400
        
        # Hash the password before storing it
        hashed_password = generate_password_hash(data.get('password')) if data.get('password') else None
        
        # Explicitly define fields to prevent mass assignment
        new_customer = Customer(
            email_address=data['email'],
            customer_name=data['name'],
            phone_number=data.get('phone', ''),
            newsletter_signup=data.get('newsletter_signup', False),
            password_hash=hashed_password
        )
        
        db.session.add(new_customer)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Customer registered successfully',
            'customer': {
                'id': new_customer.id,
                'name': new_customer.customer_name,
                'email': new_customer.email_address,
                'phone': new_customer.phone_number
            }
        }), 201
        
    except Exception as e:
        db.session.rollback()
        print(f"Error registering customer: {e}")
        return jsonify({'error': 'Failed to register customer due to an internal server error.'}), 500

@main.route("/api/reservations", methods=['GET'])
def get_reservations_api():
    try:
        reservations = Reservation.query.all()
        reservations_data = []
        
        for reservation in reservations:
            # Determine customer info source
            if reservation.customer_id and reservation.customer:
                customer_name = reservation.customer.customer_name
                email = reservation.customer.email_address
                phone = reservation.customer.phone_number
                reservation_type = 'customer'
            else:
                customer_name = reservation.guest_name
                email = reservation.guest_email
                phone = reservation.guest_phone_number
                reservation_type = 'guest'
            
            reservations_data.append({
                'id': reservation.id,
                'customer_name': customer_name or 'N/A',
                'email': email or 'N/A',
                'phone': phone or 'N/A',
                'time_slot': reservation.time_slot.isoformat(),
                'number_of_guests': reservation.number_of_guests,
                'table_number': reservation.table_number,
                'reservation_type': reservation_type,
                'customer_id': reservation.customer_id
            })
        
        return jsonify({'reservations': reservations_data}), 200
        
    except Exception as e:
        print(f"Error fetching reservations: {e}")
        return jsonify({'error': 'Failed to fetch reservations due to an internal server error.'}), 500

@main.route("/api/health", methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'message': 'Café Fausse API is running',
        'endpoints': {
            'reservations': '/api/reservations',
            'customers': '/api/customers',
            'newsletter': '/api/newsletter'
        }
    }), 200