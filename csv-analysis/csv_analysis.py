import csv
import os

base_folder = os.path.dirname(os.path.abspath(__file__))

file_path = os.path.join(
    base_folder,
    "..",
    "management-system",
    "employees.csv"
)

file_path = os.path.abspath(file_path)

print("Reading:", file_path)

with open(file_path, "r") as file:
    reader = csv.DictReader(file)
    employees = list(reader)

print("Total Employees:", len(employees))

for employee in employees:
    print(
        employee["Name"],
        employee["Department"],
        employee["Salary"]
    )