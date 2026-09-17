import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score, classification_report

# Dataset
data = {
    "Handwashing_Frequency": [1, 2, 3, 4, 5, 6, 7, 8, 2, 4],
    "Cleanliness_Score": [30, 40, 45, 60, 70, 80, 90, 95, 35, 65],
    "Waste_Disposal": [0, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    "Risk": [1, 1, 1, 0, 0, 0, 0, 0, 1, 0]
}

df = pd.DataFrame(data)

print("Dataset:")
print(df)

# Features and target
X = df[
    [
        "Handwashing_Frequency",
        "Cleanliness_Score",
        "Waste_Disposal"
    ]
]

y = df["Risk"]

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42
)

# Train model
model = DecisionTreeClassifier(random_state=42)
model.fit(X_train, y_train)

# Predict
y_pred = model.predict(X_test)

# Evaluation
print("\nPredictions:", y_pred)
print("Actual Values:", y_test.values)

print("\nAccuracy:", accuracy_score(y_test, y_pred))

print("\nClassification Report:")
print(classification_report(y_test, y_pred, zero_division=0))

# Test new data
new_data = pd.DataFrame({
    "Handwashing_Frequency": [2],
    "Cleanliness_Score": [40],
    "Waste_Disposal": [0]
})

prediction = model.predict(new_data)

if prediction[0] == 1:
    print("\nPredicted Risk: High")
else:
    print("\nPredicted Risk: Low")