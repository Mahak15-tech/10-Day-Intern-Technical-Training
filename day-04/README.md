# Day 4 – Machine Learning & Model Evaluation

## Project Overview
Day 4 focuses on supervised machine learning: preprocessing, feature
engineering, model training, evaluation, and prediction. The
practical project is a **Facility Hygiene Risk Prediction System**
that classifies facilities as High or Low hygiene risk based on
inspection data.

## Problem Statement
Manually reviewing facility inspection data to judge hygiene risk is
slow and inconsistent. The goal was to train a model that can predict
hygiene risk (High/Low) from measurable inputs like cleanliness
score, odor score, waste level, and footfall — and to compare more
than one model to see which performs best.

## Features
- Data preprocessing and feature engineering pipeline
- Two trained classification models: Logistic Regression and Random
  Forest
- Model evaluation with accuracy, precision, recall, F1-score,
  classification report, and confusion matrix
- Prediction script that scores new facility records with both
  models and reports confidence
- Trained models persisted with Joblib for reuse without retraining

## Technology Stack
- Language: Python 3
- Libraries: Pandas, NumPy, Scikit-learn, Joblib

## Architecture
```
cleaned_facility_data.csv
        ↓ preprocess.py
Preprocessed / feature-engineered data
        ↓ train.py (80/20 split)
Logistic Regression  +  Random Forest  →  scaler.joblib
        ↓ evaluate.py
Accuracy / Precision / Recall / F1 / Confusion Matrix
        ↓ predict.py
New facility record → predicted hygiene risk + confidence
```

## Database Design
Not applicable — data is read from and written to CSV files, not a
database.

## API Documentation
Not applicable — model interaction happens via the `predict.py`
script (see day-10's Flask API for the served version of this model).

## Installation
```bash
git clone <repo-url>
cd day-04
pip install pandas numpy scikit-learn joblib
```

## Environment Variables
Not applicable.

## How to Run
```bash
# 1. Preprocess the data
python preprocessing/preprocess.py

# 2. Train the models
python models/train.py

# 3. Evaluate model performance
python evaluation/evaluate.py

# 4. Predict on new facility records
python predictions/predict.py
```

## Screenshots
Not applicable — output is printed to the console.

## Challenges Faced
- Random Forest and Logistic Regression have different input
  requirements — Logistic Regression needs scaled features, Random
  Forest doesn't.

## Solutions
- Used `StandardScaler` (saved as `scaler.joblib`) only for the
  Logistic Regression pipeline, while feeding Random Forest the
  unscaled features directly, so each model gets the input it needs
  without duplicating the dataset.

## Future Improvements
- Add cross-validation instead of a single train/test split
- Try additional models (e.g. Gradient Boosting) and compare
- Add feature importance visualization
- Wire this pipeline into a proper REST API (extended in Day 10)

## Dataset Information
- Total records: 201 (160 training / 41 testing)
- High-risk records: 101 · Low-risk records: 100
- Features: Cleanliness Score, Odor Score, Waste Level, Complaints,
  Footfall, Hours Since Cleaning
- Target: `hygiene_risk` (High / Low)

## Disclaimer
This project uses a facility hygiene dataset for educational machine
learning practice. Predictions should not be treated as certified
health or safety assessments.

## Author
**Mahak Sunil Kamble**
GitHub: [Mahak15-tech](https://github.com/Mahak15-tech)