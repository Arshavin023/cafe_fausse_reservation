from setuptools import setup, find_packages

setup(
    name="cafe_fausse_reservation",
    version="0.1.0",
    description="Café Fausse Restaurant Reservation Web App (Flask + React + PostgreSQL)",
    author="Uche Nnodim",
    author_email="uchejudennodim@gmail.com",
    url="https://github.com/Arshavin023/cafe_fausse_reservation",  # optional
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        "Flask>=2.0",
        "Flask-WTF>=1.0",
        "Flask-Cors>=3.0",
        "Flask-SQLAlchemy>=3.0",
        "psycopg2-binary>=2.9",
        "WTForms>=3.0"
    ],
    classifiers=[
        "Programming Language :: Python :: 3",
        "Framework :: Flask",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires=">=3.8",
)
