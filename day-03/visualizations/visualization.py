import matplotlib.pyplot as plt

names = ["Mahak", "Riya", "Amit", "Sneha", "Rahul"]
salaries = [60000, 25000, 28000, 35000, 42000]

plt.bar(names, salaries)

plt.title("Employee Salary Comparison")
plt.xlabel("Employees")
plt.ylabel("Salary")

plt.xticks(rotation=45)
plt.tight_layout()
plt.show()