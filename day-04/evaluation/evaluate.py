import joblib
from pathlib import Path
import pandas as pd
from sklearn.metrics import (
    accuracy_score, classification_report, confusion_matrix,
    f1_score, precision_score, recall_score,
)

DATA_DIR = "../preprocessing"
BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_DIR = BASE_DIR / "models"

def load_test_data():
    from sklearn.model_selection import train_test_split

    BASE_DIR = Path(__file__).resolve().parent.parent

    df = pd.read_csv(
        BASE_DIR / "preprocessing" / "feature_engineered_data.csv"
    )

    X = df[
        [
            "cleanliness_score",
            "odor_score",
            "waste_level",
            "complaints",
            "footfall",
            "hours_since_cleaning"
        ]
    ]

    y = df["hygiene_risk"]

    _, X_test, _, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42,
        stratify=y
    )

    return X_test, y_test


def evaluate(name, y_true, y_pred):
    print(f"\n=== {name} ===")
    print(f"Accuracy:  {accuracy_score(y_true, y_pred):.3f}")
    print(f"Precision: {precision_score(y_true, y_pred, pos_label='High'):.3f}")
    print(f"Recall:    {recall_score(y_true, y_pred, pos_label='High'):.3f}")
    print(f"F1 Score:  {f1_score(y_true, y_pred, pos_label='High'):.3f}")

    cm = confusion_matrix(y_true, y_pred, labels=["Low", "High"])
    print("Confusion Matrix (rows=actual, cols=predicted, order=[Low, High]):")
    print(cm)

    return {
        "accuracy": accuracy_score(y_true, y_pred),
        "precision": precision_score(y_true, y_pred, pos_label="High"),
        "recall": recall_score(y_true, y_pred, pos_label="High"),
        "f1": f1_score(y_true, y_pred, pos_label="High"),
    }


if __name__ == "__main__":
    X_test, y_test = load_test_data()

    log_reg = joblib.load(
        MODEL_DIR / "logistic_regression.joblib"
)   
    rf = joblib.load(f"{MODEL_DIR}/random_forest.joblib")
    scaler = joblib.load(f"{MODEL_DIR}/scaler.joblib")

    X_test_scaled = scaler.transform(X_test)
    log_reg_preds = log_reg.predict(X_test_scaled)
    rf_preds = rf.predict(X_test)

    log_reg_metrics = evaluate("Logistic Regression", y_test, log_reg_preds)
    rf_metrics = evaluate("Random Forest", y_test, rf_preds)

    print("\n=== Comparison ===")
    comparison = pd.DataFrame([
        {"model": "Logistic Regression", **log_reg_metrics},
        {"model": "Random Forest", **rf_metrics},
    ]).round(3)
    print(comparison.to_string(index=False))

    better = comparison.loc[comparison["f1"].idxmax(), "model"]
    print(f"\nBetter F1 score on this test set: {better}")
