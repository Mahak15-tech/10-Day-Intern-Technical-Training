CREATE DATABASE day8_employee_db;

USE day8_employee_db;

CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    department VARCHAR(50),
    salary DECIMAL(10,2),
    email VARCHAR(100)
);

INSERT INTO employees (name, department, salary, email)
VALUES
('Asha Rao', 'IT', 60000, 'asha@example.com'),
('Vikram Shah', 'HR', 48000, 'vikram@example.com'),
('Priya Nair', 'Finance', 62000, 'priya@example.com'),
('Rahul Patil', 'IT', 58000, 'rahul@example.com');

-- Read data
SELECT * FROM employees;

-- Filter employees
SELECT * FROM employees
WHERE department = 'IT';

-- Update employee
UPDATE employees
SET salary = 60000
WHERE id = 1;

-- Aggregate functions
SELECT COUNT(*) AS total_employees
FROM employees;

SELECT AVG(salary) AS average_salary
FROM employees;

-- Department-wise count
SELECT department, COUNT(*) AS employee_count
FROM employees
GROUP BY department;

-- Sort by salary
SELECT * FROM employees
ORDER BY salary DESC;