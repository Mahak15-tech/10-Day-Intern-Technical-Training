import pandas as pd
from pathlib import Path
from sklearn.feature_selection import SelectKBest, f_classif


BASE_DIR = Path(__file__).resolve().parents[2]

INPUT_FILE = BASE_DIR / "ml" / "preprocessing" / "feature_engineered_data.csv"
OUTPUT_FILE = BASE_DIR / "ml" / "preprocessing" / "selected_features.csv"


def create_risk_label(df):
    """
    Create the target variable for hygiene risk prediction.
    """

    risk_score = (
        df["odor_score"]
        + (df["waste_level"] / 10)
        + df["complaints"]
        - df["cleanliness_score"]
    )

    df["risk_score"] = risk_score

    df["risk"] = df["risk_score"].apply(
        lambda value: "High" if value >= 8 else "Low"
    )

    return df


def select_features():
    print("Loading processed dataset...")

    df = pd.read_csv(INPUT_FILE)

    df = create_risk_label(df)

    features = [
        "cleanliness_score",
        "odor_score",
        "waste_level",
        "water_availability",
        "footfall",
        "complaints"
    ]

    X = df[features]
    y = df["risk"]

    selector = SelectKBest(score_func=f_classif, k="all")
    selector.fit(X, y)

    scores = pd.DataFrame({
        "feature": features,
        "score": selector.scores_
    })

    scores = scores.sort_values(
        by="score",
        ascending=False
    )

    print("\nFeature importance scores:")
    print(scores.to_string(index=False))

    # Keep all original data and add the risk label
    df.to_csv(OUTPUT_FILE, index=False)

    print("\nFeature selection completed successfully.")
    print(f"Saved output to: {OUTPUT_FILE}")


if __name__ == "__main__":
    select_features()