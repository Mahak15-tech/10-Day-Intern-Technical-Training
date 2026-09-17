import pandas as pd

data = {
    "Name": ["Mahak", "Riya", "Amit", None, "Sneha"],
    "Department": ["DS", "HR", "IT", "Finance", "IT"],
    "Salary": [60000, 25000, None, 35000, 42000]
}

df = pd.DataFrame(data)

print("Original Data:")
print(df)

# Check missing values
print("\nMissing Values:")
print(df.isnull().sum())

# Fill missing names
df["Name"] = df["Name"].fillna("Unknown")

# Fill missing salaries with average
df["Salary"] = df["Salary"].fillna(df["Salary"].mean())

print("\nCleaned Data:")
print(df)
