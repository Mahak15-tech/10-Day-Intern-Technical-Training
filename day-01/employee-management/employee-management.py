employees = []


def add_employee():
    try:
        employee_id = int(input("Enter Employee ID: "))
    except ValueError:
        print("Please enter a valid employee ID.")
        return

    name = input("Enter Employee Name: ")
    department = input("Enter Department: ")

    try:
        salary = float(input("Enter Salary: "))
    except ValueError:
        print("Please enter a valid salary.")
        return

    employee = {
        "id": employee_id,
        "name": name,
        "department": department,
        "salary": salary
    }

    employees.append(employee)
    print("Employee added successfully!")


def list_employees():
    if not employees:
        print("No employees found.")
        return

    for employee in employees:
        print("ID:", employee["id"])
        print("Name:", employee["name"])
        print("Department:", employee["department"])
        print("Salary:", employee["salary"])
        print("--------------------")


def search_employee():
    try:
        employee_id = int(input("Enter employee ID to search: "))
    except ValueError:
        print("Please enter a valid employee ID.")
        return

    for employee in employees:
        if employee["id"] == employee_id:
            print("Employee found!")
            print("ID:", employee["id"])
            print("Name:", employee["name"])
            print("Department:", employee["department"])
            print("Salary:", employee["salary"])
            return

    print("Employee not found.")

def update_employee():
    try:
        employee_id = int(input("Enter employee ID to update: "))
    except ValueError:
        print("Please enter a valid employee ID.")
        return

    for employee in employees:
        if employee["id"] == employee_id:
            employee["name"] = input("Enter new name: ")
            employee["department"] = input("Enter new department: ")

            try:
                employee["salary"] = float(input("Enter new salary: "))
            except ValueError:
                print("Please enter a valid salary.")
                return

            print("Employee updated successfully!")
            return

    print("Employee not found.")

def delete_employee():
    try:
        employee_id = int(input("Enter employee ID to delete: "))
    except ValueError:
        print("Please enter a valid employee ID.")
        return

    for employee in employees:
        if employee["id"] == employee_id:
            employees.remove(employee)
            print("Employee deleted successfully!")
            return

    print("Employee not found.")

def highest_salary():
    if not employees:
        print("No employees found.")
        return

    highest = employees[0]

    for employee in employees:
        if employee["salary"] > highest["salary"]:
            highest = employee

    print("Employee with highest salary:")
    print("ID:", highest["id"])
    print("Name:", highest["name"])
    print("Department:", highest["department"])
    print("Salary:", highest["salary"])

def average_salary():
    if not employees:
        print("No employees available.")
        return

    total = sum(employee["salary"] for employee in employees)
    average = total / len(employees)

    print(f"Average Salary: {average:.2f}")

def department_filter():
    department = input("Enter department: ")

    found = False

    for employee in employees:
        if employee["department"].lower() == department.lower():
            print("ID:", employee["id"])
            print("Name:", employee["name"])
            print("Department:", employee["department"])
            print("Salary:", employee["salary"])
            print("--------------------")
            found = True

    if not found:
        print("No employees found in this department.")

while True:
    print("\n===== Employee Management System =====")
    print("1. Add Employee")
    print("2. Update Employee")
    print("3. Delete Employee")
    print("4. Search Employee")
    print("5. List Employees")
    print("6. Highest Salary")
    print("7. Average Salary")
    print("8. Department Filter")
    print("9. Exit")

    choice = input("Enter your choice: ")

    if choice == "1":
        add_employee()

    elif choice == "2":
        update_employee()

    elif choice == "3":
        delete_employee()

    elif choice == "4":
        search_employee()

    elif choice == "5":
        list_employees()

    elif choice == "6":
        highest_salary()

    elif choice == "7":
        average_salary()

    elif choice == "8":
        department_filter()

    elif choice == "9":
        print("Thank you for using Employee Management System!")
        break

    else:
        print("Invalid choice. Please try again.")