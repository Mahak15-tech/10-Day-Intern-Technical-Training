import mysql.connector
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent
SCHEMA_FILE = BASE_DIR / "schema.sql"


DB_CONFIG = {
    "host": "127.0.0.1",
    "port": 3306,
    "user": "root",
    "password": "MYSQL_PASSWORD",  # Replace with your MySQL Workbench password
}


DATABASE_NAME = "hygiene_prediction_db"


FACILITIES = [
    ("FAC-1001", "North Zone"),
    ("FAC-1002", "South Zone"),
    ("FAC-1003", "East Zone"),
    ("FAC-1004", "West Zone"),
    ("FAC-1005", "Central Zone")
]


def initialize_database():

    print("Connecting to MySQL...")

    connection = mysql.connector.connect(
        **DB_CONFIG
    )

    cursor = connection.cursor()

    print("Creating database...")

    cursor.execute(
        f"CREATE DATABASE IF NOT EXISTS {DATABASE_NAME}"
    )

    cursor.execute(
        f"USE {DATABASE_NAME}"
    )

    # Read schema file
    with open(
        SCHEMA_FILE,
        "r",
        encoding="utf-8"
    ) as file:

        schema = file.read()

    # Execute individual SQL statements
    statements = [
        statement.strip()
        for statement in schema.split(";")
        if statement.strip()
    ]

    for statement in statements:

        cursor.execute(statement)

    # Add sample facilities
    cursor.executemany(
        """
        INSERT IGNORE INTO facilities
        (facility_id, location)
        VALUES (%s, %s)
        """,
        FACILITIES
    )

    connection.commit()

    # Check facilities
    cursor.execute(
        "SELECT COUNT(*) FROM facilities"
    )

    facility_count = cursor.fetchone()[0]

    # Check predictions
    cursor.execute(
        "SELECT COUNT(*) FROM predictions"
    )

    prediction_count = cursor.fetchone()[0]

    print("\nDatabase initialized successfully.")

    print(
        f"Facilities: {facility_count}"
    )

    print(
        f"Predictions: {prediction_count}"
    )

    cursor.close()
    connection.close()


if __name__ == "__main__":
    initialize_database()