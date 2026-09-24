# Day 10 – Final Project: Smart Facility Hygiene Risk Prediction System

## Project Overview
The capstone project of the 10-day training program: a full-stack
system that predicts facility hygiene risk (High/Low) from inspection
inputs, persists predictions to a MySQL database, and presents
everything through a multi-page dashboard. It brings together the
data analysis (Day 3), machine learning (Day 4), and full-stack
patterns (Days 5–9) from the rest of the program into one project.

## Problem Statement
Facility managers need a fast, consistent way to assess hygiene risk
from routine inspection data (cleanliness, odor, waste level, water
availability, footfall, complaints) instead of relying on ad-hoc
judgment — and to keep a historical record of predictions per
facility for trend analysis.

## Features
- Facility hygiene risk prediction (High/Low) with confidence score
- Prediction history stored and retrievable per facility
- Dashboard, New Assessment, Prediction History, Facilities,
  Analytics, and Settings pages
- Chart.js-based analytics on prediction trends
- REST API backend (Flask) connected to a MySQL database
- Three trained ML models compared, with the best one served live

## Technology Stack
- **Machine Learning:** Python, Pandas, Scikit-learn, Joblib
  (Logistic Regression, Decision Tree, Random Forest)
- **Backend:** Flask, Flask-CORS, mysql-connector-python
- **Database:** MySQL
- **Frontend:** HTML, CSS, JavaScript, Chart.js

## Architecture
```
frontend/ (HTML/CSS/JS, 6 pages)
        ↓ fetch()
backend/app.py (Flask REST API, CORS-enabled)
   ├── /predict         → loads ml/models/best_model.joblib + scaler.joblib
   ├── /facilities       → reads MySQL "facilities" table
   ├── /predictions       → reads MySQL "predictions" table
   └── /save-prediction   → writes to MySQL "predictions" table
        ↓
MySQL: hygiene_prediction_db (facilities, predictions)

ml/ (offline pipeline, run separately before serving)
raw dataset → preprocessing → feature_selection → eda →
train.py (3 models) → evaluate.py → best_model.joblib
```

## Database Design
**Database:** `hygiene_prediction_db`

**`facilities` table**
| Column | Type | Notes |
|---|---|---|
| `id` | INT, PK, AUTO_INCREMENT | |
| `facility_id` | VARCHAR(50) | UNIQUE, NOT NULL |
| `location` | VARCHAR(255) | |

**`predictions` table**
| Column | Type | Notes |
|---|---|---|
| `id` | INT, PK, AUTO_INCREMENT | |
| `facility_id` | VARCHAR(50) | FK → `facilities.facility_id`, `ON DELETE SET NULL` |
| `cleanliness_score`, `odor_score`, `waste_level` | DECIMAL(5,2) | NOT NULL |
| `water_availability` | TINYINT | NOT NULL |
| `footfall`, `complaints` | INT | NOT NULL |
| `predicted_risk` | VARCHAR(20) | NOT NULL |
| `confidence` | DECIMAL(5,3) | NOT NULL |
| `created_at` | DATETIME | defaults to `CURRENT_TIMESTAMP` |

## API Documentation
| Method | Endpoint | Description | Request Body | Response |
|---|---|---|---|---|
| `GET` | `/` | Health check | — | `{ "message": "Smart Facility Hygiene Risk Prediction API is running" }` |
| `GET` | `/facilities` | List all facilities | — | Array of facility rows |
| `POST` | `/predict` | Predict hygiene risk | `{ cleanliness_score, odor_score, waste_level, water_availability, footfall, complaints }` | `{ "prediction": "High"/"Low", "confidence": 0.0–1.0 }` |
| `GET` | `/predictions` | List saved predictions (newest first) | — | Array of prediction rows |
| `POST` | `/save-prediction` | Persist a prediction | facility_id + all inputs + `predicted_risk` + `confidence` | Save confirmation |

## Installation
```bash
git clone <repo-url>
cd day-10/final-project

# Backend
cd backend
pip install -r requirements.txt

# Database
mysql -u root -p < ../database/schema.sql
```

## Environment Variables
The backend currently defines its DB connection directly in
`backend/app.py`:
```
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password   # replace in app.py, or move to a .env file
DB_NAME=hygiene_prediction_db
```
**Recommended:** move these into a `.env` file (loaded via
`python-dotenv`) instead of hard-coding the password in `app.py`
before deploying or sharing this code.

## How to Run
```bash
# 1. Set up the database
mysql -u root -p < database/schema.sql
python database/init_db.py

# 2. (Optional) retrain the ML models from scratch
cd ml/models
python train.py

# 3. Start the backend API
cd ../../backend
pip install -r requirements.txt
python app.py
```
The API runs on Flask's default port (`http://127.0.0.1:5000`
unless configured otherwise).

```bash
# 4. Open the frontend
# Open frontend/index.html directly in a browser,
# or serve the frontend/ folder with a simple static server.
```

## Screenshots
|[Dashboard view](./screenshots/dashboard.png)
|[New Assessment](./screenshots/new_assessment.png)
|[Prediction](./screenshots/prediction.png)
|[Facilities](./screenshots/facilities.png)
|[Analytics](./screenshots/analytics.png)
|[Settings](./screenshots/settings.png)

## Challenges Faced
- Logistic Regression requires scaled input features while the
  tree-based models (Decision Tree, Random Forest) do not, which
  could easily produce wrong predictions if the wrong model got the
  wrong input format.
- Keeping the ML training pipeline (offline) properly wired to the
  live Flask API (online) so the API always serves the actual
  best-performing model.

## Solutions
- In `/predict`, the API checks `hasattr(model, "coef_")` to detect
  whether the loaded model is a linear model (needs scaling) or a
  tree-based model (doesn't), and applies `scaler.transform()`
  conditionally — so any of the three trained models can be dropped
  in as `best_model.joblib` without changing the API code.
- Standardized on saving the winning model as `ml/models/best_model.joblib`
  after evaluation, so the backend always loads one canonical file
  regardless of which algorithm won.

## Future Improvements
- Move database credentials out of `app.py` and into environment
  variables
- Add authentication for the Settings and Facilities management pages
- Add automated retraining when new prediction data accumulates
- Add input validation and clearer error messages on the frontend
  forms
- Containerize the backend + MySQL setup (e.g. Docker Compose) for
  easier local setup

## Machine Learning Models Compared
- Logistic Regression
- Decision Tree
- Random Forest

Evaluated on Accuracy, Precision, Recall, and F1 Score; the best
performer is saved as `ml/models/best_model.joblib` and served by
the API.

## Author
**Mahak Sunil Kamble**
GitHub: [Mahak15-tech](https://github.com/Mahak15-tech)