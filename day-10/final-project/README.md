# Day 10 – Final Project

## Smart Facility Hygiene Risk Prediction System

### Project Overview

The Smart Facility Hygiene Risk Prediction System is a machine learning based application designed to predict the hygiene risk level of a facility.

The system takes facility conditions such as cleanliness, odor, waste level, water availability, footfall and complaints as input and predicts whether the facility has **High Risk** or **Low Risk**.

The project combines **Machine Learning, Python, Flask, MySQL and a web-based frontend** into one complete application.

---

## Objectives

- Analyze facility hygiene-related data.
- Perform data preprocessing and feature engineering.
- Train and compare multiple machine learning models.
- Predict hygiene risk for new facility assessments.
- Store facility and prediction data in MySQL.
- Provide a user-friendly dashboard.
- Display prediction history and facility information.
- Provide analytics for monitoring hygiene risk.

---

## Technology Stack

### Machine Learning
- Python
- Pandas
- NumPy
- Scikit-learn
- Joblib
- Matplotlib

### Backend
- Flask
- Flask-CORS
- Python

### Database
- MySQL
- MySQL Connector

### Frontend
- HTML
- CSS
- JavaScript
- Chart.js

---

## Project Structure
```text
final-project/
│
├── backend/
│   ├── app.py
│   └── requirements.txt
│
├── database/
│   ├── init_db.py
│   └── schema.sql
│
├── frontend/
│   ├── index.html
│   ├── assessment.html
│   ├── history.html
│   ├── facilities.html
│   ├── analytics.html
│   ├── settings.html
│   ├── app.js
│   ├── styles.css
│   └── bg-green.png
│
└── ml/
    ├── dataset/
    │   └── cleaned_facility_data.csv
    │
    ├── preprocessing/
    │   ├── preprocess.py
    │   └── feature_engineered_data.csv
    │
    ├── feature_selection/
    │   └── feature_selection.py
    │
    ├── eda/
    │   └── eda.py
    │
    ├── models/
    │   ├── train.py
    │   ├── best_model.joblib
    │   ├── logistic_regression.joblib
    │   ├── decision_tree.joblib
    │   ├── random_forest.joblib
    │   └── scaler.joblib
    │
    ├── evaluation/
    │   ├── evaluate.py
    │   └── comparison_results.csv
    │
    ├── predictions/
    │   └── predict.py
    │
    └── visualizations/
        ├── correlation_matrix.png
        ├── feature_distributions_by_risk.png
        └── model_comparison.png
```
---
## Machine Learning Workflow
```text
Raw Facility Dataset
        ↓
Data Preprocessing
        ↓
Feature Engineering
        ↓
Feature Selection
        ↓
Train/Test Split
        ↓
Model Training
        ↓
Model Evaluation
        ↓
Best Model Selection
        ↓
New Facility Prediction
```
---
## Input Features

The prediction system uses the following features:

- Cleanliness Score
- Odor Score
- Waste Level
- Water Availability
- Footfall
- Complaints

The model predicts:
```text
High Risk
Low Risk
```
---
## Machine Learning Models

The following models are trained and compared:

- 1.Logistic Regression
- 2.Decision Tree
- 3.Random Forest

The models are evaluated using:

- Accuracy
- Precision
- Recall
- F1 Score

The selected model is saved as:
```text
ml/models/best_model.joblib
```
---
## Backend API

The Flask backend provides APIs for:

Check API
```text
GET /
```
Get Facilities
```text
GET /facilities
```
Generate Prediction
```text
POST /predict
```
Get Prediction History
```text
GET /predictions
```
Save Prediction
```text
POST /save-prediction
```
---
## Database

The project uses MySQL database:
```text
hygiene_prediction_db
```
## Main tables:
```text
facilities
```
Stores registered facility information.
```text
predictions
```
Stores generated hygiene risk predictions and their input values.

---

## Frontend Pages
### Dashboard

Provides an overview of:

- Registered facilities
- Total predictions
- High-risk predictions
- Low-risk predictions
- Recent prediction activity
- Risk distribution

### New Assessment

Allows users to enter facility conditions and generate a hygiene risk prediction.

### Prediction History

Displays previously stored predictions.

### Facilities

Displays registered facilities and their locations.

### Analytics

Provides visual analytics of prediction data.

### Settings

Contains application and appearance settings.

---

## How to Run
1. Install Dependencies

Open PowerShell in the backend folder:
```text
pip install -r requirements.txt
```
2. Initialize MySQL Database

Make sure MySQL Server is running.

Run:
```text
python database/init_db.py
```
This creates the required database and tables.

3. Start Flask Backend

From the final-project folder:
```text
python backend/app.py
```
The backend runs at:
```text
http://127.0.0.1:5001
```

4. Open Frontend

Open:
```text
frontend/index.html
```
using a local server such as VS Code Live Server.

---
## Features
- Machine learning based hygiene risk prediction
- Multiple model comparison
- Facility management
- Prediction history
- MySQL data storage
- Interactive analytics
- Responsive dashboard
- Light and dark theme
- Separate frontend pages
- Flask REST API
---
## Project Outcome

The project demonstrates an end-to-end machine learning application that connects:
```text
Machine Learning
        +
Python Backend
        +
MySQL Database
        +
Web Frontend
```
The system can be used to assess facility conditions, generate hygiene risk predictions and monitor prediction results through a centralized dashboard.

---

## Day 10 Deliverables
- Final AI/ML project
- Data preprocessing
- Feature engineering
- Exploratory data analysis
- Feature selection
- Machine learning model training
- Model evaluation
- Prediction system
- Flask API
- MySQL database
- Web dashboard
- Project documentation
---
## Author

Mahak Sunil Kamble

