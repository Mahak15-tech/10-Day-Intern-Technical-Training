import joblib
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from pathlib import Path

DATA_DIR = "../preprocessing"
BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_DIR = BASE_DIR / "models"
MODEL_DIR.mkdir(exist_ok=True)


def load_split():
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

    return train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42,
        stratify=y
    )


def train_logistic_regression(X_train, y_train, scaler):
    """Logistic Regression needs scaled features to converge well and to
    make its coefficients comparable across features."""
    X_train_scaled = scaler.transform(X_train)
    model = LogisticRegression(max_iter=1000, random_state=42)
    model.fit(X_train_scaled, y_train)
    return model


def train_random_forest(X_train, y_train):
    """Random Forest doesn't need scaling — tree splits are scale-invariant."""
    model = RandomForestClassifier(n_estimators=200, max_depth=6, random_state=42)
    model.fit(X_train, y_train)
    return model


if __name__ == "__main__":
    X_train, X_test, y_train, y_test = load_split()

    scaler = StandardScaler()
    scaler.fit(X_train)

    log_reg = train_logistic_regression(X_train, y_train, scaler)
    rf = train_random_forest(X_train, y_train)

    joblib.dump(log_reg, MODEL_DIR / "logistic_regression.joblib")
    joblib.dump(rf, MODEL_DIR / "random_forest.joblib")
    joblib.dump(scaler, MODEL_DIR / "scaler.joblib")

    print("Trained and saved: logistic_regression.joblib, random_forest.joblib, scaler.joblib")

    print("\nRandom Forest feature importances:")
    for feature, importance in sorted(
        zip(X_train.columns, rf.feature_importances_), key=lambda x: -x[1]
    ):
        print(f"  {feature}: {importance:.3f}")
