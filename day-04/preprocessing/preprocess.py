import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split

np.random.seed(42)

from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

INPUT_PATH = BASE_DIR / "dataset" / "cleaned_facility_data.csv"
OUTPUT_PATH = BASE_DIR / "preprocessing" / "feature_engineered_data.csv"

FEATURES = [
    "cleanliness_score", "odor_score", "waste_level",
    "complaints", "footfall", "hours_since_cleaning",
]
TARGET = "hygiene_risk"


def add_hours_since_cleaning(df):
    """Simulated field: hours since the facility was last cleaned."""
    df = df.copy()
    df["hours_since_cleaning"] = np.random.randint(1, 72, size=len(df))
    return df


def engineer_target(df):
    """
    Build a hygiene risk score from domain-relevant fields, then binarize
    at the median into High / Low risk. Noise is added so the label isn't a
    deterministic function of the inputs (more realistic, avoids trivial
    100%-accuracy leakage).
    """
    df = df.copy()
    noise = np.random.normal(0, 1.5, size=len(df))

    risk_index = (
        0.30 * (10 - df["cleanliness_score"])   # lower cleanliness -> higher risk
        + 0.25 * df["odor_score"]                # higher odor -> higher risk
        + 0.20 * (df["waste_level"] / 10)        # higher waste -> higher risk
        + 0.15 * df["complaints"]                # more complaints -> higher risk
        + 0.10 * (df["hours_since_cleaning"] / 10)  # longer since cleaned -> higher risk
        + noise
    )
    df["risk_index"] = risk_index
    threshold = risk_index.median()
    df[TARGET] = np.where(risk_index >= threshold, "High", "Low")
    return df


def preprocess():
    df = pd.read_csv(INPUT_PATH)
    df = add_hours_since_cleaning(df)
    df = engineer_target(df)
    df.to_csv(OUTPUT_PATH, index=False)

    print(f"Feature-engineered dataset saved: {OUTPUT_PATH}")
    print(f"Rows: {len(df)}")
    print("\nClass balance:")
    print(df[TARGET].value_counts())

    X = df[FEATURES]
    y = df[TARGET]
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    print(f"\nTrain set: {len(X_train)} rows, Test set: {len(X_test)} rows")

if __name__ == "__main__":
    preprocess()
