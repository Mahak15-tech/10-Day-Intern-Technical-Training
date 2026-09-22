import pandas as pd
import joblib
from pathlib import Path

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report


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


def train_models():

    print("Loading dataset...")

    df = pd.read_csv(DATA_FILE)

    # Create target variable
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

    print(f"Training samples: {len(X_train)}")
    print(f"Testing samples: {len(X_test)}")

    # Scale data for Logistic Regression
    scaler = StandardScaler()

    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # Logistic Regression
    logistic_model = LogisticRegression(random_state=42)
    logistic_model.fit(X_train_scaled, y_train)

    # Decision Tree
    decision_tree = DecisionTreeClassifier(
        random_state=42,
        max_depth=5
    )

    decision_tree.fit(X_train, y_train)

    # Random Forest
    random_forest = RandomForestClassifier(
        n_estimators=100,
        random_state=42
    )

    random_forest.fit(X_train, y_train)

    models = {
        "Logistic Regression": (
            logistic_model,
            X_test_scaled
        ),
        "Decision Tree": (
            decision_tree,
            X_test
        ),
        "Random Forest": (
            random_forest,
            X_test
        )
    }

    print("\nModel Results")
    print("=" * 50)

    results = []

    for name, (model, test_data) in models.items():

        predictions = model.predict(test_data)

        accuracy = accuracy_score(
            y_test,
            predictions
        )

        print(f"\n{name}")
        print(f"Accuracy: {accuracy:.2%}")

        print(
            classification_report(
                y_test,
                predictions,
                zero_division=0
            )
        )

        results.append({
            "model": name,
            "accuracy": round(accuracy, 4)
        })

    # Save models
    joblib.dump(
        logistic_model,
        MODEL_DIR / "logistic_regression.joblib"
    )

    joblib.dump(
        decision_tree,
        MODEL_DIR / "decision_tree.joblib"
    )

    joblib.dump(
        random_forest,
        MODEL_DIR / "random_forest.joblib"
    )

    joblib.dump(
        scaler,
        MODEL_DIR / "scaler.joblib"
    )

    # Select best model
    best_result = max(
        results,
        key=lambda item: item["accuracy"]
    )

    best_model_name = best_result["model"]

    best_model = {
        "Logistic Regression": logistic_model,
        "Decision Tree": decision_tree,
        "Random Forest": random_forest
    }[best_model_name]

    joblib.dump(
        best_model,
        MODEL_DIR / "best_model.joblib"
    )

    # Save comparison results
    evaluation_dir = BASE_DIR / "ml" / "evaluation"
    evaluation_dir.mkdir(
        parents=True,
        exist_ok=True
    )

    pd.DataFrame(results).to_csv(
        evaluation_dir / "comparison_results.csv",
        index=False
    )

    print("\nTraining completed successfully.")
    print(f"Best model: {best_model_name}")
    print(f"Accuracy: {best_result['accuracy']:.2%}")


if __name__ == "__main__":
    train_models()