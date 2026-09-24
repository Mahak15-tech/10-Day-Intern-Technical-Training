# Day 1 – Programming Fundamentals & Problem Solving

## Project Overview
Day 1 of the 10-day intern technical training program. It covers core
programming fundamentals in Python and a first practical project: a
command-line Employee Management System, alongside a set of classic
programming problems.

## Problem Statement
Before building anything data- or web-facing, the goal was to prove
basic control-flow, function design, and input-validation skills in
Python — and to practice structuring a small program (add/search/list
records) the way a real system would, using plain Python data
structures with no external libraries.

## Features
**Employee Management System**
- Add an employee (ID, name, department, salary)
- List all employees
- Search for an employee by ID
- Input validation for numeric fields (ID, salary)

**Problem Solving Exercises**
- 15 classic programming problems, including reversing a string,
  finding the largest number in a list, palindrome checking, and
  vowel counting

## Technology Stack
- Language: Python 
- Concepts: functions, lists, dictionaries, loops, exception handling
- Tools: Git, GitHub

## Architecture
A single-file, in-memory CLI script. `employees` is a list of
dictionaries held in memory for the life of the program; each menu
action (add/list/search) is a plain function operating on that list.
There is no persistence layer — data is lost when the script exits.

```
User input (console) → Python functions (add/list/search) → in-memory list
```

## Database Design
Not applicable — data is held in memory only, not persisted to a
database or file.

## API Documentation
Not applicable — this is a standalone console script with no API.

## Installation
```bash
git clone <repo-url>
cd day-01
# No external dependencies — uses only the Python standard library
```

## Environment Variables
Not applicable — no configuration or secrets are used.

## How to Run
```bash
python employee-management/employee-management.py
```
Follow the on-screen menu to add, list, or search employees.

To run the practice problems:
```bash
python exercises/problems.py
```

## Screenshots
Not applicable — console-only output.

## Challenges Faced
- Handling invalid numeric input (e.g. entering text for an ID or
  salary) without crashing the program.

## Solutions
- Wrapped numeric input conversion in `try/except ValueError` blocks
  so invalid entries print a friendly message and return to the menu
  instead of raising an unhandled exception.

## Future Improvements
- Persist employee data to a CSV or JSON file so it survives between
  runs
- Add update and delete operations
- Add unit tests for each function

## Author
**Mahak Sunil Kamble**
GitHub: [Mahak15-tech](https://github.com/Mahak15-tech)