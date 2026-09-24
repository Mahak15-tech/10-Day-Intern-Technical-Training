import csv
import mysql.connector
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent
SCHEMA_FILE = BASE_DIR / "schema.sql"

DATASET_FILE = (
    BASE_DIR.parent
    / "ml"
    / "dataset"
    / "cleaned_facility_data.csv"
)


DB_CONFIG = {
    "host": "127.0.0.1",
    "port": 3306,
    "user": "root",
    "password": "MYSQL_PASSWORD",  # Replace with your MySQL Workbench password
}


DATABASE_NAME = "hygiene_prediction_db"


def load_facilities_from_csv():

    facilities = []

    with open(
        DATASET_FILE,
        "r",
        encoding="utf-8"
    ) as file:

        reader = csv.DictReader(file)

        for row in reader:

            facility_id = row["facility_id"].strip()
            location = row["location"].strip()

            if not any(
                existing[0] == facility_id
                for existing in facilities
            ):
                facilities.append(
                    (facility_id, location)
                )

    return facilities


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

    # Load real facilities from CSV
    print("Loading facilities from dataset...")

    facilities = load_facilities_from_csv()

    print(
        f"Found {len(facilities)} facilities in dataset."
    )

    # Remove old sample facilities
    cursor.execute(
        "DELETE FROM facilities"
    )

    # Insert real dataset facilities
    cursor.executemany(
        """
        INSERT INTO facilities
        (facility_id, location)
        VALUES (%s, %s)
        """,
        facilities
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