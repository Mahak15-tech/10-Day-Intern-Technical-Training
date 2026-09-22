import pandas as pd
import joblib
from pathlib import Path

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score
)


BASE_DIR = Path(__file__).resolve().parents[2]

DATA_FILE = BASE_DIR / "ml" / "preprocessing" / "feature_engineered_data.csv"
MODEL_DIR = BASE_DIR / "ml" / "models"


FEATURES = [
    "cleanliness_score",
    "odor_score",
    "waste_level",
    "water_availability",
    "footfall",
    "complaints"
]


def evaluate_models():

    print("Loading dataset...")

    df = pd.read_csv(DATA_FILE)

    # Create target
    risk_score = (
        df["odor_score"]
        + (df["waste_level"] / 10)
        + df["complaints"]
        - df["cleanliness_score"]
    )

    df["risk"] = risk_score.apply(
        lambda value: "High" if value >= 8 else "Low"
    )

    X = df[FEATURES]
    y = df["risk"]

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42,
        stratify=y
    )

    scaler = joblib.load(
        MODEL_DIR / "scaler.joblib"
    )

    X_test_scaled = scaler.transform(X_test)

    models = {
        "Logistic Regression": (
            joblib.load(
                MODEL_DIR / "logistic_regression.joblib"
            ),
            X_test_scaled
        ),
        "Decision Tree": (
            joblib.load(
                MODEL_DIR / "decision_tree.joblib"
            ),
            X_test
        ),
        "Random Forest": (
            joblib.load(
                MODEL_DIR / "random_forest.joblib"
            ),
            X_test
        )
    }

    results = []

    print("\nModel Evaluation")
    print("=" * 60)

    for name, (model, test_data) in models.items():

        predictions = model.predict(test_data)

        accuracy = accuracy_score(
            y_test,
            predictions
        )

        precision = precision_score(
            y_test,
            predictions,
            pos_label="High",
            zero_division=0
        )

        recall = recall_score(
            y_test,
            predictions,
            pos_label="High",
            zero_division=0
        )

        f1 = f1_score(
            y_test,
            predictions,
            pos_label="High",
            zero_division=0
        )

        print(f"\n{name}")
        print(f"Accuracy : {accuracy:.2%}")
        print(f"Precision: {precision:.2%}")
        print(f"Recall   : {recall:.2%}")
        print(f"F1 Score : {f1:.2%}")

        results.append({
            "model": name,
            "accuracy": round(accuracy, 4),
            "precision": round(precision, 4),
            "recall": round(recall, 4),
            "f1_score": round(f1, 4)
        })

    results_df = pd.DataFrame(results)

    output_file = BASE_DIR / "ml" / "evaluation" / "comparison_results.csv"

    results_df.to_csv(
        output_file,
        index=False
    )

    print("\nEvaluation completed successfully.")
    print(f"Results saved to: {output_file}")


if __name__ == "__main__":
    evaluate_models()