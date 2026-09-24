# Day 3 – NumPy, Pandas & Data Visualization

## Project Overview
Day 3 moves from plain Python into the data-science stack: NumPy for
array operations, Pandas for tabular data cleaning and analysis, and
Matplotlib for visualization. The practical project analyzes a
facility hygiene dataset — the same dataset later used to train the
machine learning models in Day 4 and the Day 10 final project.

## Problem Statement
Raw data is rarely clean. The task was to take a real facility
hygiene dataset (with missing values and duplicates), clean it, and
extract meaningful statistics and visual comparisons — the standard
first step of any data science or ML pipeline.

## Features
**Facility Data Analysis** (`analysis/facility_analysis.py`)
- Loads `facility_hygiene_ml_dataset.xlsx` with Pandas
- Reports dataset shape, missing values, and duplicate rows
- Drops duplicate records
- Fills missing `cleanliness_score` and `waste_level` with the column
  mean, and missing `water_availability` with `"Unknown"`
- Prints a statistical summary (`.describe()`) and hygiene risk
  value counts

**Data Cleaning exercise** (`data-cleaning/data_cleaning.py`)
- Demonstrates filling missing names and salaries in a small sample
  employee DataFrame

**Visualization** (`visualizations/visualization.py`)
- Bar chart comparing employee salaries with Matplotlib

**NumPy / Pandas exercises**
- Standalone practice scripts covering array operations and
  DataFrame basics

## Technology Stack
- Language: Python 3
- Libraries: NumPy, Pandas, Matplotlib, openpyxl (for `.xlsx` reading)

## Architecture
```
facility_hygiene_ml_dataset.xlsx
        ↓ pandas.read_excel
   Raw DataFrame
        ↓ drop_duplicates(), fillna()
   Cleaned DataFrame
        ↓ describe(), value_counts()
   Console report + Matplotlib chart
```

## Database Design
Not applicable — the dataset is an Excel file, not a database.

## API Documentation
Not applicable — these are standalone analysis scripts.

## Installation
```bash
git clone <repo-url>
cd day-03
pip install pandas numpy matplotlib openpyxl
```

## Environment Variables
Not applicable.

## How to Run
```bash
# Facility hygiene data analysis
cd analysis
python facility_analysis.py

# Data cleaning demo
python ../data-cleaning/data_cleaning.py

# Visualization
python ../visualizations/visualization.py
```

## Screenshots
Not applicable — output is console text and a Matplotlib window.

## Challenges Faced
- Deciding how to handle missing values differently depending on
  column type (numeric vs. categorical).

## Solutions
- Used mean imputation for numeric columns (`cleanliness_score`,
  `waste_level`) and an explicit `"Unknown"` placeholder for the
  categorical `water_availability` column, rather than dropping rows
  and losing data.

## Future Improvements
- Save the cleaned dataset to a new file instead of only printing it
- Add more chart types (histograms, boxplots) to spot outliers
- Move hard-coded file paths into command-line arguments

## Author
**Mahak Sunil Kamble**
GitHub: [Mahak15-tech](https://github.com/Mahak15-tech)