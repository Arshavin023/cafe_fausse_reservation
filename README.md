# cafe_fausse_reservation
# 🛒 Café Fausse Reservation System

This is a web application for Café Fausse, a fictional coffee shop. The system allows customers to view the menu, learn about the cafe, and make table reservations. It is built using the Flask web framework and a PostgreSQL database.

# How Reservation Works

To combat the issue of no-shows and ensure the efficient use of our seating, the reservation system employs a credit card hold mechanism.
When a customer makes a reservation, the system requires their credit card details. These details are used to place a temporary authorization hold for a small amount (e.g., $10 per person). This is not a charge, but a verification that the card is valid and has sufficient funds.
Successful Authorization: The reservation is confirmed and the table is secured.
Failed Authorization: The reservation is not created, and the user is prompted to try again with a valid card.
In the event of a no-show, the café reserves the right to convert the authorization hold into a final charge, compensating the business for the lost opportunity. This ensures a fairer system for all customers and staff.

---

## 🚀 Features

- **Home Page: An introductory page for the cafe.**
- **About Us: Information about the cafe's history and mission.**
- **Menu: A full menu with starters, main courses, desserts, and beverages.**
- **Reservation System: A form for customers to book a table. The system allows reservation for both new and existing customers.**
- **Admin Page: A dedicated route for administrative tasks (currently a placeholder).**
- **Customer Registration: Customers can register an account to streamline the reservation process.**
- **Customer Reviews and Ratings**

---

## 📦 Tech Stack

- **Flask: The core Python web framework.** 
- **SQLAlchemy: ORM (Object-Relational Mapper) for database interactions.**
- **PostgreSQL: The relational database used to store customer and reservation data.**
- **WTForms: Python library for creating and validating web forms.**
- **Jinja2: Templating engine for rendering HTML pages.**
- **HTML/CSS/Tailwind CSS: Frontend structure and styling.**
- **Authentication: JWT Tokens** 
- **Dev Tools: Swagger, Git, VSCode, Linux** 

---

## 📚 API Endpoints Overview

### 1. 🔐 Authentication & Authorization

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/register` | POST | Customer Registration |
| `/login` | POST | Customer Login |
| `/refresh` | POST | Refresh JWT Token |
| `/logout` | POST | Customer Logout |
| `/roles` | GET | Get Roles (Admin) |
| `/assign-role` | POST | Assign Role to User (Admin) |

---

### 2. 👤 User Profile

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/profile/{id}` | GET | Get Customer Profile |
| `/profiles` | GET | Get All Customer Profiles (Admin) |

---

### 3. 🗂️ Home, Menu, Gallery, About-Us

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/home` | GET | Access HomePage |
| `/menu` | GET | View Menu Items |
| `/gallery` | GET | View Aesthetics of Restaurant |
| `/about-us` | GET | Read About Restaurant |

---

### 4. 📦 Reservation Management

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/reservations/create` | POST | Book New Reservation |
| `/reservations/{id}` | GET | Get Reservation Details |
| `/reservations` | GET | List User Reservations |
| `/reservations/update/{id}/status` | PUT | Update Reservation Schedule |

---

### 6. 🛒 Cart & Checkout

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/cart` | POST | Add Item to Cart |
| `/cart` | GET | Get Cart Items |
| `/cart/{item_id}` | DELETE | Remove Item from Cart |
| `/checkout` | POST | Checkout and Create Order |

---

### 7. 💳 Payment Integration

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/payment` | POST | Initiate Payment |
| `/payment/verify/{transaction_id}` | GET | Verify Payment Status |

---

### 8. ⭐ Review & Rating

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/reviews` | POST | Add Product Review |
| `/products/{id}/reviews` | GET | Get Reviews for Product |

---

### 9. 🔔 Notifications

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/notifications` | GET | List Order Notifications |
| `/notifications/{id}` | PUT | Mark Notification as Read |

---

### 10. 📊 Admin Reporting

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/reports/sales` | GET | Get Sales Report |
| `/reports/users` | GET | Get User Analytics |
| `/dashboard/stats` | GET | Get Summary Stats |

---

## 📖 Getting Started
## Installation <a name="installation"></a>
#### Prerequisites <a name="prerequisites"></a>
Before running the application, ensure you have the following prerequisites installed:
- Python 3.x
- PostgreSQL database

## Configuration <a name="configuration"></a>
Create database_credentials file and fill in the info
```bash
nano /home/ubuntu/database_credentials/config.ini
[database]
reservationapp_host=localhost
reservationapp_port=5432
reservationapp_username=database_username
reservationapp_password=database_password
reservationapp_database=database_name
reservationapp_secret_key=secret_key
```

### 1. Clone the Repo <a name="Clone the Repo"></a>
```bash
git clone https://github.com/Arshavin023/cafe_fausse_reservation.git
cd cafe_fausse_reservation
```

### 2. Create and Activate Virtual Environment <a name="create and activate virtual environment"></a>
```bash
python3 -m venv venv_cafe && source venv_cafe/bin/activate
```

### 3. Install Python Packages <a name="Install the required Python packages"></a>
```bash
pip install -r requirements.txt
```

### 4. Run App For Testing <a name="Run App to Test Endpoints"></a>
```bash
flask run
```

## Deployment <a name="deployment"></a>

## License <a name="license"></a>
- MIT License

## Authors & Acknowledgements <a name="authors_and_acknowledgments"></a>
- Uche Nnodim
