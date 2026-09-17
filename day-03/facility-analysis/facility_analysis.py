import pandas as pd
import matplotlib.pyplot as plt

data = {
    "Facility": ["Hospital A", "Hospital B", "Hospital C", "Hospital D", "Hospital E"],
    "Patients": [120, 150, 100, 180, 130],
    "Staff": [25, 30, 20, 35, 28],
    "Satisfaction": [85, 90, 78, 92, 88]
}

df = pd.DataFrame(data)

print("Facility Dataset:")
print(df)

print("\nDataset Information:")
print(df.info())

print("\nStatistical Summary:")
print(df.describe())

print("\nAverage Patients:", df["Patients"].mean())
print("Average Satisfaction:", df["Satisfaction"].mean())

plt.bar(df["Facility"], df["Patients"])
plt.title("Patients per Facility")
plt.xlabel("Facility")
plt.ylabel("Number of Patients")
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()
# Staff comparison
plt.figure()
plt.bar(df["Facility"], df["Staff"])
plt.title("Staff per Facility")
plt.xlabel("Facility")
plt.ylabel("Number of Staff")
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()

# Satisfaction comparison
plt.figure()
plt.plot(df["Facility"], df["Satisfaction"], marker="o")
plt.title("Facility Satisfaction")
plt.xlabel("Facility")
plt.ylabel("Satisfaction (%)")
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()