import { useState } from "react";
import type { Employee } from "../types/employee";

interface AddEmployeeFormProps {
  onAdd: (employee: Employee) => void;
  onClose: () => void;
  editingEmployee?: Employee | null;
}

const AddEmployeeForm = ({
  onAdd,
  onClose,
  editingEmployee,
}: AddEmployeeFormProps) => {
  const [name, setName] = useState(editingEmployee?.name || "");
  const [department, setDepartment] = useState(
    editingEmployee?.department || "IT"
  );
  const [salary, setSalary] = useState(
    editingEmployee ? String(editingEmployee.salary) : ""
  );
  const [email, setEmail] = useState(editingEmployee?.email || "");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const employee: Employee = {
      id: editingEmployee?.id || Date.now(),
      name,
      department,
      salary: Number(salary),
      email,
    };

    onAdd(employee);
    onClose();
  };

  return (
    <div className="form-overlay">
      <form className="employee-form" onSubmit={handleSubmit}>
        <h2>{editingEmployee ? "Edit Employee" : "Add Employee"}</h2>

        <input
          placeholder="Full name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />

        <select
          value={department}
          onChange={(event) => setDepartment(event.target.value)}
        >
          <option>IT</option>
          <option>HR</option>
          <option>Finance</option>
          <option>Marketing</option>
        </select>

        <input
          type="number"
          placeholder="Monthly salary"
          value={salary}
          onChange={(event) => setSalary(event.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <div className="form-actions">
          <button type="button" onClick={onClose}>
            Cancel
          </button>

          <button type="submit">
            {editingEmployee ? "Save Changes" : "Add Employee"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployeeForm;