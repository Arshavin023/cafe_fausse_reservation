from flask import request, Blueprint, jsonify
from .models import db, Customer, Reservation, Newsletter
import random
from datetime import datetime
import re

main = Blueprint("main", __name__)

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
        
        # Check if customer exists
        customer = Customer.query.filter_by(email_address=data['customerEmail']).first()
        
        # Assign random table (simulate table availability check)
        table_number = random.randint(1, 30)
        
        # Handle customer creation first if saveCustomerInfo is true
        if not customer and data.get('saveCustomerInfo', False):
            # Create new customer first
            new_customer = Customer(
                email_address=data['customerEmail'],
                customer_name=data['customerName'],
                phone_number=data.get('phoneNumber', ''),
                newsletter_signup=False
            )
            db.session.add(new_customer)
            db.session.flush()  # Flush to get the ID without committing
            customer = new_customer  # Now treat as existing customer
        
        # Create reservation
        if customer:
            # Existing customer or newly created customer - link via customer_id only
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
        return jsonify({'error': f'Failed to create reservation: {str(e)}'}), 500

@main.route("/api/newsletter", methods=['POST'])
def newsletter_signup_api():
    try:
        data = request.get_json()
        email = data.get('email')
        
        if not email:
            return jsonify({'error': 'Email is required'}), 400
        
        # Validate email format
        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_pattern, email):
            return jsonify({'error': 'Invalid email format'}), 400
        
        # Check if newsletter subscription already exists
        newsletter = Newsletter.query.filter_by(email=email).first()
        if newsletter:
            if newsletter.newsletter_signup:
                return jsonify({
                    'success': False,
                    'message': 'Email is already subscribed to newsletter'
                }), 400
            else:
                # Reactivate subscription
                newsletter.newsletter_signup = True
        else:
            # Create new newsletter subscription
            newsletter = Newsletter(email=email, newsletter_signup=True)
            db.session.add(newsletter)
        
        # Also update customer table if customer exists
        customer = Customer.query.filter_by(email_address=email).first()
        if customer:
            customer.newsletter_signup = True
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Successfully subscribed to newsletter'
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Failed to subscribe: {str(e)}'}), 500

@main.route("/api/newsletter/unsubscribe", methods=['POST'])
def newsletter_unsubscribe_api():
    try:
        data = request.get_json()
        email = data.get('email')
        
        if not email:
            return jsonify({'error': 'Email is required'}), 400
        
        # Validate email format
        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_pattern, email):
            return jsonify({'error': 'Invalid email format'}), 400
        
        # Check if newsletter subscription exists
        newsletter = Newsletter.query.filter_by(email=email).first()
        customer = Customer.query.filter_by(email_address=email).first()
        
        # Check if email exists in either newsletter or customer table
        if not newsletter and not customer:
            return jsonify({
                'success': False,
                'error': 'Email address not found. Cannot unsubscribe an email that was never subscribed.'
            }), 404
        
        # Check if email is actually subscribed
        is_subscribed = False
        if newsletter and newsletter.newsletter_signup:
            is_subscribed = True
        if customer and customer.newsletter_signup:
            is_subscribed = True
        
        if not is_subscribed:
            return jsonify({
                'success': False,
                'message': 'Email is not currently subscribed to newsletter'
            }), 400
        
        # Update newsletter table
        if newsletter:
            newsletter.newsletter_signup = False
        
        # Update customer table if customer exists
        if customer:
            customer.newsletter_signup = False
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Successfully unsubscribed from newsletter'
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Failed to unsubscribe: {str(e)}'}), 500

@main.route("/api/newsletter/status/<email>", methods=['GET'])
def newsletter_status_api(email):
    try:
        # Validate email format
        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_pattern, email):
            return jsonify({'error': 'Invalid email format'}), 400
        
        # Check subscription status in both tables
        newsletter = Newsletter.query.filter_by(email=email).first()
        customer = Customer.query.filter_by(email_address=email).first()
        
        is_subscribed = False
        subscription_source = None
        
        if newsletter and newsletter.newsletter_signup:
            is_subscribed = True
            subscription_source = 'newsletter'
        elif customer and customer.newsletter_signup:
            is_subscribed = True
            subscription_source = 'customer'
        
        return jsonify({
            'email': email,
            'is_subscribed': is_subscribed,
            'subscription_source': subscription_source,
            'exists_in_newsletter_table': newsletter is not None,
            'exists_in_customer_table': customer is not None
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Failed to check subscription status: {str(e)}'}), 500

@main.route("/api/customers/<email>", methods=['GET'])
def get_customer_api(email):
    try:
        customer = Customer.query.filter_by(email_address=email).first()
        
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
        return jsonify({'error': f'Failed to fetch customer: {str(e)}'}), 500

@main.route("/api/customers/register", methods=['POST'])
def register_customer_api():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['email', 'name']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        # Check if customer already exists
        existing_customer = Customer.query.filter_by(email_address=data['email']).first()
        if existing_customer:
            return jsonify({'error': 'Customer already exists'}), 400
        
        # Create new customer
        new_customer = Customer(
            email_address=data['email'],
            customer_name=data['name'],
            phone_number=data.get('phone', ''),
            newsletter_signup=data.get('newsletter_signup', False),
            password=data.get('password', None)  # Optional password
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
        return jsonify({'error': f'Failed to register customer: {str(e)}'}), 500

@main.route("/api/reservations", methods=['GET'])
def get_reservations_api():
    try:
        reservations = Reservation.query.all()
        reservations_data = []
        
        for reservation in reservations:
            # Determine customer info source
            if reservation.customer_id and reservation.customer:
                # Linked to customer record
                customer_name = reservation.customer.customer_name
                email = reservation.customer.email_address
                phone = reservation.customer.phone_number
                reservation_type = 'customer'
            else:
                # Guest reservation
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
        return jsonify({'error': f'Failed to fetch reservations: {str(e)}'}), 500

# Health check endpoint
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