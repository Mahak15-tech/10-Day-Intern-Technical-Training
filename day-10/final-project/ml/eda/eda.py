import pandas as pd
import matplotlib.pyplot as plt
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parents[2]

INPUT_FILE = BASE_DIR / "ml" / "dataset" / "cleaned_facility_data.csv"
OUTPUT_DIR = BASE_DIR / "ml" / "visualizations"


def run_eda():

    print("Loading dataset...")

    df = pd.read_csv(INPUT_FILE)

    print("\nDataset shape:")
    print(df.shape)

    print("\nDataset information:")
    print(df.info())

    print("\nMissing values:")
    print(df.isnull().sum())

    print("\nStatistical summary:")
    print(df.describe())

    OUTPUT_DIR.mkdir(
        parents=True,
        exist_ok=True
    )

    # Numeric columns
    numeric_columns = [
        "cleanliness_score",
        "odor_score",
        "waste_level",
        "footfall",
        "complaints"
    ]

    # Feature distributions
    df[numeric_columns].hist(
        figsize=(12, 8),
        bins=10
    )

    plt.suptitle(
        "Facility Hygiene Feature Distributions"
    )

    plt.tight_layout()

    plt.savefig(
        OUTPUT_DIR / "feature_distributions_by_risk.png"
    )

    plt.close()

    # Correlation matrix
    correlation = df[numeric_columns].corr()

    plt.figure(
        figsize=(8, 6)
    )

    plt.imshow(
        correlation,
        cmap="coolwarm",
        interpolation="nearest"
    )

    plt.colorbar()

    plt.xticks(
        range(len(numeric_columns)),
        numeric_columns,
        rotation=45,
        ha="right"
    )

    plt.yticks(
        range(len(numeric_columns)),
        numeric_columns
    )

    plt.title(
        "Feature Correlation Matrix"
    )

    plt.tight_layout()

    plt.savefig(
        OUTPUT_DIR / "correlation_matrix.png"
    )

    plt.close()

    print("\nEDA completed successfully.")
    print(f"Visualizations saved to: {OUTPUT_DIR}")


if __name__ == "__main__":
    run_eda()