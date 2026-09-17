import pandas as pd
import matplotlib.pyplot as plt

# Load Excel dataset
df = pd.read_excel("facility_hygiene_ml_dataset.xlsx")

print("First 5 Records:")
print(df.head())

print("\nDataset Shape:")
print(df.shape)

print("\nMissing Values:")
print(df.isnull().sum())

print("\nDuplicate Records:")
print(df.duplicated().sum())

# Data cleaning
df = df.drop_duplicates()

df["cleanliness_score"] = df["cleanliness_score"].fillna(
    df["cleanliness_score"].mean()
)

df["waste_level"] = df["waste_level"].fillna(
    df["waste_level"].mean()
)

df["water_availability"] = df["water_availability"].fillna("Unknown")

print("\nCleaned Dataset:")
print(df.head())

print("\nStatistical Summary:")
print(df.describe())

print("\nHygiene Risk Counts:")
print(df["hygiene_risk"].value_counts())

# Chart 1: Hygiene Risk Distribution
plt.figure()
df["hygiene_risk"].value_counts().plot(kind="bar")
plt.title("Hygiene Risk Distribution")
plt.xlabel("Hygiene Risk")
plt.ylabel("Number of Facilities")
plt.tight_layout()
plt.show()

# Chart 2: Cleanliness Score
plt.figure()
plt.hist(df["cleanliness_score"], bins=10)
plt.title("Cleanliness Score Distribution")
plt.xlabel("Cleanliness Score")
plt.ylabel("Frequency")
plt.tight_layout()
plt.show()

# Chart 3: Waste Level
plt.figure()
plt.hist(df["waste_level"], bins=10)
plt.title("Waste Level Distribution")
plt.xlabel("Waste Level")
plt.ylabel("Frequency")
plt.tight_layout()
plt.show()

# Chart 4: Facility Type
plt.figure()
df["facility_type"].value_counts().plot(kind="bar")
plt.title("Facilities by Type")
plt.xlabel("Facility Type")
plt.ylabel("Count")
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()