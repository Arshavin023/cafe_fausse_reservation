from flask import render_template, request, redirect, url_for, flash, Blueprint
from .models import db, Customer, Reservation
from .forms import RegistrationForm, ReservationForm

main = Blueprint("main", __name__)

# Home page
@main.route("/")
def home():
    return render_template("home.html")

# About Us page
@main.route("/about")
def about():
    return render_template("about-us.html")

# Menu page
@main.route("/menu")
def menu():
    return render_template("menu.html")

# Gallery page
@main.route("/gallery")
def gallery():
    return render_template("gallery.html")

@main.route("/reservation", methods=['GET', 'POST'])
def reservation():
    form = ReservationForm()
    
    if request.method == 'POST':
        if form.validate_on_submit():
            customer = Customer.query.filter_by(email_address=form.guest_email.data).first()

            if customer:
                new_reservation = Reservation(
                    time_slot=form.time_slot.data,
                    number_of_guests=form.number_of_guests.data,
                    table_number=form.table_number.data,
                    customer_id=customer.id
                )
            else:
                new_reservation = Reservation(
                    time_slot=form.time_slot.data,
                    number_of_guests=form.number_of_guests.data,
                    table_number=form.table_number.data,
                    guest_name=form.guest_name.data,
                    guest_email=form.guest_email.data,
                    guest_phone_number=form.guest_phone_number.data
                )

            # try:
                db.session.add(new_reservation)
                db.session.commit()
                flash("Your reservation has been successfully submitted!", "success")
                return redirect(url_for('main.home')) # Redirect to a different page, e.g., home
            # except Exception as e:
            #     db.session.rollback()
            #     flash("An error occurred. Please try again.", "danger")
            #     print(f"Error during reservation submission: {e}")
        else:
            # This block handles failed validation.
            # Flash messages for each field that failed validation.
            for field, errors in form.errors.items():
                for error in errors:
                    flash(f"Error in {field}: {error}", "danger")
    
    # This renders the page for both GET requests and failed POST requests.
    return render_template("reservation.html", form=form)

# Register page
@main.route("/register",methods=['GET', 'POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        match = Customer.query.filter_by(email_address=form.email_address.data).first()
        if match:
            flash("User already exists!", "danger")
        else:
            new_user = Customer(
                email_address=form.email_address.data,
                password=form.password.data
            )
            db.session.add(new_user)
            db.session.commit()
            flash("A new user was created!", "success")
            return redirect(url_for("main.home"))
    return render_template("register.html", form=form)

# Admin page (optional: protect this later with login)
@main.route("/admin")
def admin():
    return render_template("admin.html")

