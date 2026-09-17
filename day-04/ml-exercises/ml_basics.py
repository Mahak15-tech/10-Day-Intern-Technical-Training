from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
import numpy as np

# Sample data
X = np.array([
    [1, 20],
    [2, 25],
    [3, 30],
    [4, 35],
    [5, 40],
    [6, 45],
    [7, 50],
    [8, 55]
])

y = np.array([0, 0, 0, 1, 1, 1, 1, 1])

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=42
)

# Train model
model = LogisticRegression()
model.fit(X_train, y_train)

# Prediction
y_pred = model.predict(X_test)

# Evaluation
accuracy = accuracy_score(y_test, y_pred)

print("Predictions:", y_pred)
print("Actual Values:", y_test)
print("Accuracy:", accuracy)