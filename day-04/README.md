# Day 4 – Machine Learning & Model Evaluation

## 📌 Overview

Day 4 focused on machine learning concepts, data preprocessing,
feature engineering, model training, evaluation, and predictions.

The practical project is a **Facility Hygiene Risk Prediction System**.

---

## 🎯 Objectives

- Understand supervised machine learning
- Perform data preprocessing
- Apply feature engineering
- Train multiple classification models
- Evaluate model performance
- Generate predictions for new facility records
- Save trained models using Joblib

---

## 📂 Project Structure

day-04/
│
├── dataset/
│   └── cleaned_facility_data.csv
│
├── preprocessing/
│   ├── preprocess.py
│   └── feature_engineered_data.csv
│
├── models/
│   ├── train.py
│   ├── logistic_regression.joblib
│   ├── random_forest.joblib
│   └── scaler.joblib
│
├── evaluation/
│   └── evaluate.py
│
├── predictions/
│   └── predict.py
│
└── README.md

---

## 🛠️ Technologies Used

- Python
- Pandas
- NumPy
- Scikit-learn
- Joblib

---

## 🔄 Workflow

1. Load the facility dataset
2. Perform data preprocessing
3. Apply feature engineering
4. Generate hygiene risk labels
5. Split data into training and testing sets
6. Train Logistic Regression
7. Train Random Forest Classifier
8. Evaluate model performance
9. Predict hygiene risk for new facilities

---

## 🤖 Machine Learning Models

### 1. Logistic Regression

Used as a classification model to predict hygiene risk.

StandardScaler is used to scale the input features.

### 2. Random Forest Classifier

An ensemble learning algorithm that combines multiple
decision trees to perform classification.

Random Forest does not require feature scaling.

---

## 📊 Dataset Information

- Total records: 201
- Training records: 160
- Testing records: 41
- High-risk records: 101
- Low-risk records: 100

### Features

- Cleanliness Score
- Odor Score
- Waste Level
- Complaints
- Footfall
- Hours Since Cleaning

### Target

`hygiene_risk`

Possible values:

- High
- Low

---

## 📈 Evaluation Metrics

The models are evaluated using:

- Accuracy
- Precision
- Recall
- F1-score
- Classification Report
- Confusion Matrix

---

## 🔮 Predictions

The prediction script evaluates new facility inspection records
using both trained machine learning models.

Predictions are displayed in the terminal.

Model confidence scores are also calculated.

---

## 💾 Model Persistence

Joblib is used to save and load trained models.

Saved files:

- logistic_regression.joblib
- random_forest.joblib
- scaler.joblib

---
## ⚠️ Disclaimer

This project uses a facility hygiene dataset for educational
machine learning practice. Predictions should not be treated
as certified health or safety assessments.
---