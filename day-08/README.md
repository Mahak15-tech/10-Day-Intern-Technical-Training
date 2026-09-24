# Day 8 – SQL and Laravel

## Project Overview
Day 8 covers relational database fundamentals with MySQL and a
matching Laravel REST API for employee records. It has two parts: a
standalone SQL script for CRUD/aggregate practice, and a Laravel API
(`laravel-api/`) with a full Employee resource backed by MySQL/SQLite.

## Problem Statement
Earlier days stored employee data in memory or in flat files. Day 8's
goal was to model the same employee data properly in a relational
database — with a real schema, constraints (e.g. unique email), and
a framework-backed REST API (Laravel) instead of a hand-rolled server.

## Features
- Create an employee database and table
- Insert, read, update, and delete employee records (via SQL and via
  the Laravel API)
- Filter employees by department
- Calculate average and highest salary
- Perform SQL aggregate queries (`COUNT`, `AVG`, `GROUP BY`, `ORDER BY`)
- Full REST resource for employees via Laravel (`apiResource`)

## Technology Stack
- MySQL, MySQL Workbench 8.0
- PHP, Laravel
- SQL

## Architecture
```
Client (HTTP request)
        ↓
routes/api.php → Route::apiResource('employees', EmployeeController)
        ↓
EmployeeController (index/store/show/update/destroy)
        ↓
Employee Eloquent model
        ↓
employees table (MySQL/SQLite)
```
The standalone `sql/employee_database.sql` script demonstrates the
same CRUD/aggregate operations directly in SQL, independent of the
Laravel app.

## Database Design
**Database:** `day8_employee_db` (raw SQL) — Laravel app uses its own
`employees` migration.

**`employees` table:**
| Column | Type | Notes |
|---|---|---|
| `id` | INT, PK, AUTO_INCREMENT | |
| `name` | VARCHAR(100) / string | |
| `department` | VARCHAR(50) / string | |
| `salary` | DECIMAL(10,2) | |
| `email` | VARCHAR(100) / string | unique in the Laravel migration |
| `created_at` / `updated_at` | timestamps | Laravel-managed |

## API Documentation
Laravel `apiResource('employees', EmployeeController::class)` exposes:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/employees` | List all employees |
| `POST` | `/api/employees` | Create a new employee |
| `GET` | `/api/employees/{id}` | Get one employee |
| `PUT/PATCH` | `/api/employees/{id}` | Update an employee |
| `DELETE` | `/api/employees/{id}` | Delete an employee |

## Installation
```bash
git clone <repo-url>
cd day-08/laravel-api
composer install
cp .env.example .env
php artisan key:generate
```

**Raw SQL practice:**
```bash
mysql -u root -p < ../sql/employee_database.sql
```

## Environment Variables
Set in `laravel-api/.env` (copied from `.env.example`):
```
DB_CONNECTION=sqlite      # or mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=day8_employee_db
# DB_USERNAME=root
# DB_PASSWORD=
```
By default the project is configured for SQLite for easy local setup;
switch to MySQL by uncommenting and filling in the `DB_*` values.

## How to Run
```bash
cd laravel-api
php artisan migrate
php artisan serve
```
The API is available at `http://127.0.0.1:8000/api/employees`.

## Screenshots
Not applicable — this is an API-only project (no UI).

## Challenges Faced
- Deciding between SQLite (simple local setup) and MySQL (matches
  the SQL practice and later days) for the Laravel database driver.

## Solutions
- Defaulted `.env` to SQLite for zero-config local development, while
  keeping the MySQL connection details commented and ready to enable
  for parity with the raw SQL script and later projects.

## Future Improvements
- Add request validation (Form Requests) to the Laravel controller
- Add authentication to the API (Sanctum is already installed)
- Add automated tests for each CRUD endpoint

## Learning Outcomes
- SQL database management and CRUD operations
- SQL aggregate functions, filtering, and sorting
- Laravel API development with Eloquent models and migrations
- Structuring a RESTful resource controller

## Author
**Mahak Sunil Kamble**
GitHub: [Mahak15-tech](https://github.com/Mahak15-tech)