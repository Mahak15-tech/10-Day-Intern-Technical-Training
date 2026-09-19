import type { Employee } from "../types/employee";

interface EmployeeCardProps {
  employee: Employee;
}

const EmployeeCard = ({ employee }: EmployeeCardProps) => {
  return (
    <div className="employee-card">
      <h3>{employee.name}</h3>
      <p>Department: {employee.department}</p>
      <p>Salary: ₹{employee.salary}</p>
      <p>Email: {employee.email}</p>
    </div>
  );
};

export default EmployeeCard;