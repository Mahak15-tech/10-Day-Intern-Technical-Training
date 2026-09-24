from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import mysql.connector
from pathlib import Path
import os
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
CORS(app)


BASE_DIR = Path(__file__).resolve().parent.parent

MODEL_DIR = BASE_DIR / "ml" / "models"
DATASET_FILE = BASE_DIR / "ml" / "dataset" / "cleaned_facility_data.csv"


FEATURES = [
    "cleanliness_score",
    "odor_score",
    "waste_level",
    "water_availability",
    "footfall",
    "complaints"
]


# MySQL configuration
DB_CONFIG = {
    "host": os.getenv("DB_HOST", "127.0.0.1"),
    "port": int(os.getenv("DB_PORT", "3306")),
    "user": os.getenv("DB_USER", "root"),
    "password": os.getenv("DB_PASSWORD", ""),
    "database": os.getenv("DB_NAME", "hygiene_prediction_db")
}


# Load ML model
model = joblib.load(
    MODEL_DIR / "best_model.joblib"
)

scaler = joblib.load(
    MODEL_DIR / "scaler.joblib"
)


def get_connection():
    return mysql.connector.connect(
        **DB_CONFIG
    )


@app.route("/", methods=["GET"])
def home():

    return jsonify({
        "message": "Smart Facility Hygiene Risk Prediction API is running"
    })


@app.route("/api/facilities", methods=["GET"])
def get_facilities():

    try:

        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        cursor.execute(
            """
            SELECT *
            FROM facilities
            ORDER BY id
            """
        )

        facilities = cursor.fetchall()

        cursor.close()
        connection.close()

        return jsonify(facilities)

    except Exception as error:

        return jsonify({
            "error": str(error)
        }), 500
@app.route("/api/dataset", methods=["GET"])
def get_dataset():

    try:
        data = pd.read_csv(DATASET_FILE)

        data = data.fillna("")

        return jsonify({
            "total_records": len(data),
            "columns": list(data.columns),
            "records": data.to_dict(orient="records")
        })

    except Exception as error:

        return jsonify({
            "error": str(error)
        }), 500

@app.route("/api/predict", methods=["POST"])
def predict():

    try:

        data = request.get_json()

        input_data = pd.DataFrame([{
            "cleanliness_score": float(
                data["cleanliness_score"]
            ),
            "odor_score": float(
                data["odor_score"]
            ),
            "waste_level": float(
                data["waste_level"]
            ),
            "water_availability": int(
                data["water_availability"]
            ),
            "footfall": int(
                data["footfall"]
            ),
            "complaints": int(
                data["complaints"]
            )
        }])

        # Logistic Regression needs scaled data.
        # Tree-based models use the original values.
        if hasattr(model, "coef_"):
            model_input = scaler.transform(
                input_data[FEATURES]
            )
        else:
            model_input = input_data[FEATURES]

        prediction = model.predict(
            model_input
        )[0]

        probability = model.predict_proba(
            model_input
        ).max()

        return jsonify({
            "prediction": str(prediction),
            "confidence": round(
                float(probability),
                3
            )
        })

    except Exception as error:

        return jsonify({
            "error": str(error)
        }), 400


@app.route("/api/predictions", methods=["GET"])
def get_predictions():

    try:

        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        cursor.execute(
            """
            SELECT *
            FROM predictions
            ORDER BY created_at DESC
            """
        )

        predictions = cursor.fetchall()

        cursor.close()
        connection.close()

        return jsonify(predictions)

    except Exception as error:

        return jsonify({
            "error": str(error)
        }), 500


@app.route("/api/save-prediction", methods=["POST"])
def save_prediction():

    try:
        data = request.get_json()

        connection = get_connection()
        cursor = connection.cursor()

        query = """
            INSERT INTO predictions (
                facility_id,
                cleanliness_score,
                odor_score,
                waste_level,
                water_availability,
                footfall,
                complaints,
                predicted_risk,
                confidence
            )
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """

        values = (
            data["facility_id"],
            float(data["cleanliness_score"]),
            float(data["odor_score"]),
            float(data["waste_level"]),
            int(data["water_availability"]),
            int(data["footfall"]),
            int(data["complaints"]),
            data["predicted_risk"],
            float(data["confidence"])
        )

        cursor.execute(query, values)

        connection.commit()

        cursor.close()
        connection.close()

        return jsonify({
            "message": "Prediction saved successfully"
        })

    except Exception as error:

        return jsonify({
            "error": str(error)
        }), 400

if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5001,
        debug=True
    )