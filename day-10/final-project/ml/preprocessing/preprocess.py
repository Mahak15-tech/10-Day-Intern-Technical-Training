import pandas as pd
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parents[2]

INPUT_FILE = BASE_DIR / "ml" / "dataset" / "cleaned_facility_data.csv"
OUTPUT_FILE = BASE_DIR / "ml" / "preprocessing" / "feature_engineered_data.csv"


FEATURES = [
    "cleanliness_score",
    "odor_score",
    "waste_level",
    "water_availability",
    "footfall",
    "complaints"
]


def preprocess_data():
    print("Loading dataset...")

    df = pd.read_csv(INPUT_FILE)

    print(f"Dataset loaded: {df.shape[0]} rows, {df.shape[1]} columns")

    # Convert inspection date into useful numerical features
    df["inspection_date"] = pd.to_datetime(df["inspection_date"])

    df["inspection_year"] = df["inspection_date"].dt.year
    df["inspection_month"] = df["inspection_date"].dt.month
    df["inspection_day"] = df["inspection_date"].dt.day

    # Convert water availability into numerical form
    df["water_availability"] = df["water_availability"].map({
        "Yes": 1,
        "No": 0
    })

    # Create a simple hygiene score
    df["hygiene_score"] = (
        df["cleanliness_score"]
        - df["odor_score"]
        - (df["waste_level"] / 10)
        + (df["water_availability"] * 2)
        - df["complaints"]
    )

    # Save processed dataset
    df.to_csv(OUTPUT_FILE, index=False)

    print("Preprocessing completed successfully.")
    print(f"Saved processed dataset to: {OUTPUT_FILE}")
    print("\nProcessed columns:")
    print(df.columns.tolist())


if __name__ == "__main__":
    preprocess_data()