import pandas as pd
import joblib
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parents[2]

MODEL_DIR = BASE_DIR / "ml" / "models"


FEATURES = [
    "cleanliness_score",
    "odor_score",
    "waste_level",
    "water_availability",
    "footfall",
    "complaints"
]


NEW_FACILITIES = pd.DataFrame([
    {
        "facility_id": "FAC-9001",
        "cleanliness_score": 8.5,
        "odor_score": 1.2,
        "waste_level": 20.0,
        "water_availability": 1,
        "footfall": 110,
        "complaints": 0
    },
    {
        "facility_id": "FAC-9002",
        "cleanliness_score": 3.2,
        "odor_score": 7.8,
        "waste_level": 85.0,
        "water_availability": 0,
        "footfall": 140,
        "complaints": 6
    },
    {
        "facility_id": "FAC-9003",
        "cleanliness_score": 6.0,
        "odor_score": 3.5,
        "waste_level": 45.0,
        "water_availability": 1,
        "footfall": 125,
        "complaints": 2
    }
])


def make_predictions():

    print("Loading trained model...")

    model = joblib.load(
        MODEL_DIR / "best_model.joblib"
    )

    scaler = joblib.load(
        MODEL_DIR / "scaler.joblib"
    )

    X = NEW_FACILITIES[FEATURES]

    # Scale only for Logistic Regression
    if hasattr(model, "coef_"):
        X_input = scaler.transform(X)
    else:
        X_input = X

    predictions = model.predict(X_input)

    probabilities = model.predict_proba(X_input)

    confidence = probabilities.max(axis=1)

    results = NEW_FACILITIES[
        ["facility_id"]
    ].copy()

    results["predicted_risk"] = predictions

    results["confidence"] = confidence.round(3)

    print("\nPrediction Results")
    print("=" * 50)

    print(
        results.to_string(index=False)
    )

    print("\nPrediction completed successfully.")


if __name__ == "__main__":
    make_predictions()