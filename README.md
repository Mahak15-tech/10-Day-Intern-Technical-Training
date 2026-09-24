# 🚀 10-Day Intern Technical Training

A structured technical training program covering programming
fundamentals, data science, machine learning, and full-stack web
development. This repository contains the daily exercises, practical
projects, and final capstone completed during the internship
training program.

---

## 👩‍💻 Trainee Information

**Name:** Mahak Sunil Kamble
**Branch:** B.E. Computer Science & Engineering (Data Science)
**Institution:** Prof. Ram Meghe College of Engineering & Management (SGBAU)

---

## Project Overview
Each day of the program pairs a set of learning topics with a hands-on
project, most of them building on the same running thread — an
**Employee Management** system and a **Facility Hygiene Risk
Prediction** system — reimplemented and extended across different
languages, frameworks, and layers of the stack (console → data
analysis → ML → REST API → SQL → three separate frontend frameworks
→ a full-stack ML-backed capstone).

## Problem Statement
The goal of the program was to build a working, end-to-end skill set
across the modern software/data stack in 10 days: strengthen
programming fundamentals, learn data analysis and machine learning,
practice full-stack web development, and use Git/GitHub for version
control and documentation — culminating in one integrated final
project that combines all of it.

## Training Progress

| Day | Topics | Practical Project | Status |
|---|---|---|---|
| [Day 1](day-01/README.md) | Programming Fundamentals & Problem Solving | Console Employee Management System | ✅ Completed |
| [Day 2](day-02/README.md) | Python, OOP & CSV Analysis | OOP Employee Management System + CSV Analysis | ✅ Completed |
| [Day 3](day-03/README.md) | NumPy, Pandas & Data Visualization | Facility Hygiene Data Analysis | ✅ Completed |
| [Day 4](day-04/README.md) | Machine Learning & Model Evaluation | Facility Hygiene Risk Prediction (Logistic Regression + Random Forest) | ✅ Completed |
| [Day 5](day-05/README.md) | JavaScript, Async Programming & APIs | Employee Dashboard (mock REST API + localStorage) | ✅ Completed |
| [Day 6](day-06/README.md) | React & TypeScript | EmployeeSphere (React + TS + Vite) | ✅ Completed |
| [Day 7](day-07/README.md) | Next.js & Node.js | EmployeeSphere (Next.js frontend + Express API) | ✅ Completed |
| [Day 8](day-08/README.md) | SQL & Laravel | SQL practice + Laravel Employee REST API | ✅ Completed |
| [Day 9](day-09/README.md) | Angular & RxJS | Angular Employee Dashboard + ML prediction panel | ✅ Completed |
| [Day 10](day-10/final-project/README.md) | Final Project & Presentation | Smart Facility Hygiene Risk Prediction System (full stack) | ✅ Completed |

**Progress: 10 / 10 Days — Program Complete** 🎉

---

## Features
Across the 10 days, this repository demonstrates:
- CRUD systems built from scratch in Python, JavaScript, PHP, and TypeScript
- Data cleaning, analysis, and visualization with NumPy/Pandas/Matplotlib
- A trained and evaluated machine learning pipeline (Logistic
  Regression, Decision Tree, Random Forest) for hygiene-risk classification
- Four different frontend approaches to the same problem (vanilla JS,
  React, Next.js, Angular)
- Two backend REST API approaches (Node/Express, Laravel)
- Relational database design and SQL (MySQL)
- A full-stack capstone tying ML, a Flask API, MySQL, and a
  multi-page frontend together

## Technology Stack

### Programming Languages
- Python, JavaScript, TypeScript, SQL, PHP

### Data Science & Machine Learning
- NumPy, Pandas, Matplotlib
- Scikit-learn (Logistic Regression, Decision Tree, Random Forest), Joblib

### Web Development
- React, Next.js, Node.js/Express, Angular, Laravel, Flask
- REST APIs, RxJS, Chart.js

### Database
- MySQL, SQLite (Laravel default)

### Tools
- Git, GitHub, Visual Studio Code

## Architecture
The repository is organized as one folder per training day, each
self-contained with its own code, dependencies, and README:

```
10-Day-Intern-Technical-Training/
├── day-01/   Console Employee Management (Python)
├── day-02/   OOP Employee Management + CSV Analysis (Python)
├── day-03/   Facility Data Analysis (NumPy/Pandas/Matplotlib)
├── day-04/   ML Hygiene Risk Prediction — training/evaluation (Scikit-learn)
├── day-05/   Employee Dashboard (Vanilla JS + mock API)
├── day-06/   EmployeeSphere (React + TypeScript + Vite)
├── day-07/   EmployeeSphere (Next.js + Node/Express API)
├── day-08/   SQL + Laravel Employee API (MySQL)
├── day-09/   Angular Employee Dashboard + ML prediction panel
├── day-10/final-project/   Smart Facility Hygiene Risk Prediction System
│                           (Flask API + MySQL + ML + multi-page frontend)
├── .gitignore
└── README.md   ← you are here
```

The clearest throughline is the **Facility Hygiene Risk** dataset:
cleaned and explored in Day 3 → modeled in Day 4 → served live via a
Flask API and MySQL database in Day 10, with Day 9's Angular app
calling that same prediction model.

## Database Design
Two days use a real relational database (see their individual READMEs
for full schemas):
- **Day 8** — MySQL/SQLite `employees` table (Laravel migration)
- **Day 10 (final project)** — MySQL `hygiene_prediction_db`, with
  `facilities` and `predictions` tables (foreign-keyed)

Days 1–7 and Day 9 either hold data in memory, in `localStorage`, or
read/write flat files (CSV/Excel) — see each day's README for details.

## API Documentation
Three days expose or consume REST APIs (full endpoint tables are in
each day's own README):
- **Day 7** — Node/Express API (`GET /api/employees`)
- **Day 8** — Laravel `apiResource` for employees (full CRUD)
- **Day 9** — Angular app consuming both Day 8's Laravel API and an
  ML prediction endpoint
- **Day 10** — Flask API (`/predict`, `/facilities`, `/predictions`,
  `/save-prediction`)

## Installation
Each day is a separate, independently runnable project with its own
dependencies. Clone the repo once, then set up whichever day you want
to run:

```bash
git clone <repo-url>
cd 10-Day-Intern-Technical-Training
```

Then follow the **Installation** and **How to Run** sections in that
day's own README — links are in the Training Progress table above.
Python days need `pip install`, the Node/React/Next/Angular days need
`npm install`, and Day 8/10 need a MySQL instance running locally.

## Environment Variables
Most days don't require any. The exceptions are:
- **Day 8** (`laravel-api/.env`) — database connection settings
- **Day 10** (`backend/app.py`) — MySQL connection settings (currently
  hard-coded; see that day's README for the recommended fix)

See each day's own README for the exact variables.

## How to Run
There's no single "run everything" command — each day is a standalone
project (console script, static HTML page, or its own frontend +
backend pair). Open the day you want and follow its README:

| Type | Days | Quick start |
|---|---|---|
| Console/script | 1, 2, 3, 4 | `python <script>.py` |
| Static HTML/JS | 5 | Open `index.html` in a browser |
| Frontend + dev server | 6, 9 | `npm install && npm run dev` / `ng serve` |
| Frontend + separate backend | 7 | Start `node-api`, then `nextjs-app` |
| Backend API only | 8 | `php artisan serve` (after `migrate`) |
| Full stack (DB + API + frontend) | 10 | Set up MySQL, run Flask backend, open frontend |

## Challenges Faced
- Keeping ten separate, differently-stacked projects (Python, plain
  JS, React, Next.js, Angular, Laravel, Flask) consistent in
  structure and documentation as the program progressed.
- Carrying the same dataset (facility hygiene) and the same domain
  model (employees) across very different technologies without
  duplicating logic unnecessarily.
- Coordinating multiple simultaneously-running services in the later
  days (e.g. Day 9's Angular app depends on both a Laravel API and an
  ML prediction API being up at the same time).

## Solutions
- Adopted one shared README structure across every day so the
  program's documentation stays consistent even as the tech stack
  changes daily.
- Reused the Day 3/Day 4 facility hygiene dataset and model as the
  backbone of the Day 10 capstone instead of starting from scratch,
  so the earlier days' work fed directly into the final project.
- Documented required startup order (e.g. "start the API before the
  frontend") explicitly in each day's README to reduce setup friction.

## Future Improvements
- Add a `docker-compose.yml` to spin up the databases and backend
  services needed for Days 8–10 in one command
- Move all hard-coded API URLs and credentials into `.env` files
  consistently across days
- Add automated tests for the API-backed days (7, 8, 9, 10)
- Deploy the Day 10 final project so it's viewable without local setup

## Learning Deliverables
Each training day includes:
- Learning notes
- Practical coding exercises
- Project implementation
- Testing and debugging
- Git commits
- README documentation

## Acknowledgement
This repository was created as part of my intern technical training
program to document my learning journey, practical work, and
technical development.

## Author
**Mahak Sunil Kamble**
GitHub: [Mahak15-tech](https://github.com/Mahak15-tech)