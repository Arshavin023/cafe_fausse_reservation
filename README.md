# cafe_fausse_reservation
# 🗓️Café Fausse Reservation System

This is a web application for Café Fausse, a fictional coffee shop. The system allows customers to view the menu, learn about the cafe, and make table reservations. It is built using the Flask web framework and a PostgreSQL database.

# How Reservation Works
Customers arrives at the website, explores and proceeds to either register as new or existing customers.
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

### 📚 API Endpoints Overview

This section provides an overview of the RESTful API endpoints available in the application, categorized by their function.

---

### 1. 🗓️ Reservations

Manage the booking of tables for customers and guests.

| Endpoint | Method | Description | Request Body Example |
|---|---|---|---|
| `/api/reservations` | `POST` | Creates a new reservation. Can be for an existing customer or a guest. | `{"customerName": "John Doe", "customerEmail": "john@example.com", "timeSlot": "2025-12-25T19:00:00Z", "numberOfGuests": 4, "phoneNumber": "123-456-7890", "saveCustomerInfo": true}` |
| `/api/reservations` | `GET` | Retrieves a list of all reservations, including customer and guest details. | *(None)* |

---

### 2. 👤 Customers

Endpoints for managing customer information.

| Endpoint | Method | Description | Request Body Example |
|---|---|---|---|
| `/api/customers/register` | `POST` | Registers a new customer account. | `{"email": "jane@example.com", "name": "Jane Smith", "phone": "987-654-3210", "newsletter_signup": true}` |
| `/api/customers/<email>` | `GET` | Retrieves detailed information for a specific customer based on their email. | *(None)* |

---

### 3. 💌 Newsletter

Manage subscriptions to the cafe's newsletter.

| Endpoint | Method | Description | Request Body Example |
|---|---|---|---|
| `/api/newsletter` | `POST` | Subscribes an email to the newsletter. Reactivates a subscription if one already exists. | `{"email": "user@example.com"}` |
| `/api/newsletter/unsubscribe` | `POST` | Unsubscribes an email from the newsletter. | `{"email": "user@example.com"}` |
| `/api/newsletter/status/<email>` | `GET` | Checks the subscription status of a given email. | *(None)* |

---

### 4. 🏥 Health Check

| Endpoint | Method | Description |
|---|---|---|
| `/api/health` | `GET` | Returns the health status of the API and an overview of available endpoints. |

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
