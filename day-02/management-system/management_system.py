import os
import csv

class Employee:
    def __init__(self, emp_id, name, department, salary):
        self.emp_id = emp_id
        self.name = name
        self.department = department
        self.salary = salary

    def display(self):
        print(
            self.emp_id,
            self.name,
            self.department,
            self.salary
        )


employees = []


def add_employee():
    try:
        emp_id = int(input("Enter Employee ID: "))
        name = input("Enter Name: ")
        department = input("Enter Department: ")
        salary = float(input("Enter Salary: "))

        if salary <= 0:
            print("Salary must be positive.")
            return

        employee = Employee(emp_id, name, department, salary)
        employees.append(employee)

        print("Employee added successfully!")

    except ValueError:
        print("Please enter valid numeric values.")

def view_employees():
    if not employees:
        print("No employees found.")
        return

    for employee in employees:
        employee.display()

def search_employee():
    emp_id = int(input("Enter Employee ID to search: "))

    for employee in employees:
        if employee.emp_id == emp_id:
            employee.display()
            return

    print("Employee not found.")

def update_employee():
    emp_id = int(input("Enter Employee ID to update: "))

    for employee in employees:
        if employee.emp_id == emp_id:
            employee.name = input("Enter new name: ")
            employee.department = input("Enter new department: ")
            employee.salary = float(input("Enter new salary: "))

            print("Employee updated successfully!")
            return

    print("Employee not found.")

def delete_employee():
    emp_id = int(input("Enter Employee ID to delete: "))

    for employee in employees:
        if employee.emp_id == emp_id:
            employees.remove(employee)
            print("Employee deleted successfully!")
            return

    print("Employee not found.")

def save_employees():
    base_folder = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(base_folder, "employees.csv")

    with open(file_path, "w", newline="") as file:
        writer = csv.writer(file)

        writer.writerow(["ID", "Name", "Department", "Salary"])

        for employee in employees:
            writer.writerow([
                employee.emp_id,
                employee.name,
                employee.department,
                employee.salary
            ])

    print("Employees saved successfully!")

def load_employees():
    employees.clear()

    base_folder = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(base_folder, "employees.csv")

    try:
        with open(file_path, "r") as file:
            reader = csv.DictReader(file)

            for row in reader:
                employee = Employee(
                    int(row["ID"]),
                    row["Name"],
                    row["Department"],
                    float(row["Salary"])
                )

                employees.append(employee)

        print("Employees loaded successfully!")

    except FileNotFoundError:
        print("No saved employee file found.")

def average_salary():
    if not employees:
        print("No employees available.")
        return

    total_salary = sum(employee.salary for employee in employees)
    average = total_salary / len(employees)

    print("Average Salary:", average)

def department_filter():
    department = input("Enter Department: ")

    found = False

    for employee in employees:
        if employee.department.lower() == department.lower():
            employee.display()
            found = True

    if not found:
        print("No employees found in this department.")

load_employees()

while True:
    print("\n--- Employee Management System ---")
    print("1. Add Employee")
    print("2. View Employees")
    print("3. Search Employee")
    print("4. Update Employee")
    print("5. Delete Employee")
    print("6. Save Employees")
    print("7. Load Employees")
    print("8. Average Salary")
    print("9. Department Filter")
    print("10. Exit")

    choice = input("Enter your choice: ")

    if choice == "1":
        add_employee()

    elif choice == "2":
        view_employees()

    elif choice == "3":
        search_employee()

    elif choice == "4":
        update_employee()

    elif choice == "5":
        delete_employee()

    elif choice == "6":
        save_employees()

    elif choice == "7":
        load_employees()

    elif choice == "8":
        average_salary()

    elif choice == "9":
        department_filter()

    elif choice == "10":
        print("Thank you!")
        break

    else:
        print("Invalid choice. Try again.")