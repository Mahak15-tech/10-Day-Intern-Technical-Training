import pandas as pd

data = {
    "Name": ["Mahak", "Riya", "Amit", "Sneha"],
    "Department": ["DS", "HR", "IT", "Finance"],
    "Salary": [60000, 25000, 28000, 35000]
}

df = pd.DataFrame(data)

print("Employee Data:")
print(df)

print("\nFirst 2 Employees:")
print(df.head(2))

print("\nAverage Salary:")
print(df["Salary"].mean())

print("\nDepartment Counts:")
print(df["Department"].value_counts())