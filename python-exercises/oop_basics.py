class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.__salary = salary

    def display_salary(self):
        print("Salary:", self.__salary)

    def update_salary(self, new_salary):
        if new_salary > 0:
            self.__salary = new_salary
        else:
            print("Invalid salary")


emp1 = Employee("Mahak", 25000)

emp1.display_salary()

emp1.update_salary(30000)

emp1.display_salary()

class Person:
    def __init__(self, name):
        self.name = name

    def display_name(self):
        print("Name:", self.name)


class Employee(Person):
    def __init__(self, name, salary):
        super().__init__(name)
        self.salary = salary

    def display_salary(self):
        print("Salary:", self.salary)


emp1 = Employee("Mahak", 25000)

emp1.display_name()
emp1.display_salary()

class Developer:
    def work(self):
        print("Developer writes code")


class Designer:
    def work(self):
        print("Designer creates designs")


employees = [Developer(), Designer()]

for employee in employees:
    employee.work()