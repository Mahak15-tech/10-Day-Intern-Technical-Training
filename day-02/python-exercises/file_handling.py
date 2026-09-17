file = open("employees.txt", "w")

file.write("Mahak,25000\n")
file.write("Riya,30000\n")

file.close()

print("Data saved successfully")

file = open("employees.txt", "r")

data = file.read()

print(data)

file.close()

try:
    number = int(input("Enter a number: "))
    result = 100 / number
    print("Result:", result)

except ValueError:
    print("Please enter a valid number.")

except ZeroDivisionError:
    print("Cannot divide by zero.")

finally:
    print("Program completed.")