import joblib
import pandas as pd
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_DIR = BASE_DIR / "models"

# New facility inspection records — not seen during training
new_facilities = pd.DataFrame([
    {"facility_id": "FAC-9001", "cleanliness_score": 8.5, "odor_score": 1.2,
     "waste_level": 20.0, "complaints": 0, "footfall": 110, "hours_since_cleaning": 4},
    {"facility_id": "FAC-9002", "cleanliness_score": 3.2, "odor_score": 7.8,
     "waste_level": 85.0, "complaints": 6, "footfall": 140, "hours_since_cleaning": 60},
    {"facility_id": "FAC-9003", "cleanliness_score": 6.0, "odor_score": 3.5,
     "waste_level": 45.0, "complaints": 2, "footfall": 125, "hours_since_cleaning": 30},
])

FEATURES = [
    "cleanliness_score", "odor_score", "waste_level",
    "complaints", "footfall", "hours_since_cleaning",
]

if __name__ == "__main__":
    log_reg = joblib.load(f"{MODEL_DIR}/logistic_regression.joblib")
    log_reg.multi_class = "auto"
    rf = joblib.load(f"{MODEL_DIR}/random_forest.joblib")
    scaler = joblib.load(f"{MODEL_DIR}/scaler.joblib")

    X_new = new_facilities[FEATURES]
    X_new_scaled = scaler.transform(X_new)

    log_reg_preds = log_reg.predict(X_new_scaled)
    log_reg_proba = log_reg.predict_proba(X_new_scaled)
    rf_preds = rf.predict(X_new)
    rf_proba = rf.predict_proba(X_new)

    results = new_facilities[["facility_id"]].copy()
    results["logistic_regression_prediction"] = log_reg_preds
    results["logistic_regression_confidence"] = log_reg_proba.max(axis=1).round(3)
    results["random_forest_prediction"] = rf_preds
    results["random_forest_confidence"] = rf_proba.max(axis=1).round(3)

    print(results.to_string(index=False))
    print("\nPrediction completed successfully.")
