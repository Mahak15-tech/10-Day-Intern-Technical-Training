# Day 2 – Python, OOP & CSV Analysis

## Project Overview
Day 2 builds on Day 1 by rewriting the Employee Management System
using object-oriented programming, and adds a CSV-based data analysis
script plus standalone exercises on file handling and OOP basics.

## Problem Statement
Day 1's employee system stored records as plain dictionaries with no
structure or reuse across functions. The goal for Day 2 was to model
an employee as a proper class, and to practice reading and analyzing
tabular data (CSV) the way it's commonly consumed in real applications.

## Features
**Employee Management System (OOP version)**
- `Employee` class with `emp_id`, `name`, `department`, and `salary`
- Add employee with input validation (salary must be positive)
- View, search, update, and delete employees
- Save/load employee records
- Calculate average salary
- Filter employees by department

**CSV Analysis**
- Reads `employees.csv` with Python's `csv.DictReader`
- Prints total employee count
- Displays each employee's name, department, and salary

## Technology Stack
- Language: Python 3
- Libraries: `csv`, `os` (standard library only)
- Concepts: Object-Oriented Programming, file handling, CSV parsing

## Architecture
```
employees.csv → csv.DictReader → list of dicts → printed report
                                        ↑
              Employee class instances (management_system.py)
```
The CSV analysis script (`csv-analysis/csv_analysis.py`) resolves the
path to `management-system/employees.csv` relative to its own file
location, so it works regardless of the current working directory.

## Database Design
Not applicable — `employees.csv` is a flat file, not a relational
database.

## API Documentation
Not applicable — these are standalone scripts with no API layer.

## Installation
```bash
git clone <repo-url>
cd day-02
# No external dependencies — uses only the Python standard library
```

## Environment Variables
Not applicable.

## How to Run
```bash
# Employee management system (OOP)
python management-system/management_system.py

# CSV analysis
python csv-analysis/csv_analysis.py

# OOP / file handling exercises
python python-exercises/oop_basics.py
python python-exercises/file_handling.py
```

## Screenshots
Not applicable — console-only output.

## Challenges Faced
- Making the CSV analysis script locate `employees.csv` correctly no
  matter which directory it's run from.

## Solutions
- Used `os.path.dirname(os.path.abspath(__file__))` to build an
  absolute path to the CSV relative to the script's own location,
  rather than relying on the current working directory.

## Future Improvements
- Merge the OOP employee system with the CSV analysis so records can
  be loaded from and saved back to CSV directly
- Add data validation when reading CSV rows (e.g. non-numeric salary)
- Add unit tests for the `Employee` class

## Author
**Mahak Sunil Kamble**
GitHub: [Mahak15-tech](https://github.com/Mahak15-tech)