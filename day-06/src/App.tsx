import { useEffect, useState } from "react";
import { employees as initialEmployees } from "./data/employees";
import type { Employee } from "./types/employee";
import AddEmployeeForm from "./components/AddEmployeeForm";
import "./App.css";

function App() {
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [employees, setEmployees] = useState<Employee[]>(() => {
    const savedEmployees = localStorage.getItem("employees");

    return savedEmployees
      ? JSON.parse(savedEmployees)
      : initialEmployees;
  });
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
    }, [employees]);
  const resetEmployees = () => {
    setEmployees(initialEmployees);
    localStorage.removeItem("employees");
  };
  const [darkMode, setDarkMode] = useState(false);

  const departments = [
    "All",
    ...new Set(employees.map((employee) => employee.department)),
  ];

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.email.toLowerCase().includes(search.toLowerCase());

    const matchesDepartment =
      department === "All" || employee.department === department;

    return matchesSearch && matchesDepartment;
  });

  const averageSalary =
    employees.length > 0
      ? employees.reduce((total, employee) => total + employee.salary, 0) /
        employees.length
      : 0;

  const saveEmployee = (employee: Employee) => {
    if (editingEmployee) {
      setEmployees((currentEmployees) =>
        currentEmployees.map((item) =>
          item.id === employee.id ? employee : item
      )
    );
    } else {
      setEmployees((currentEmployees) => [...currentEmployees, employee]);
    }

    setEditingEmployee(null);
    setShowForm(false);
  };

  const deleteEmployee = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (confirmed) {
      setEmployees((currentEmployees) =>
        currentEmployees.filter((employee) => employee.id !== id)
      );
    }
  };

  return (
    <main className={`dashboard ${darkMode ? "dark-mode" : ""}`}>
      <nav className="navbar">
        <div className="brand">
          <span>✦</span> EmployeeSphere
        </div>
        <div className="nav-status">● Dashboard active</div>

        <button
          className="theme-button"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </nav>

      <section className="hero">
        <div>
          <p className="eyebrow">EMPLOYEE MANAGEMENT</p>
          <h1>
            Manage your team
            <br />
            <em>with clarity.</em>
          </h1>
          <p className="hero-description">
            A simple and beautiful workspace to view and manage your employees.
          </p>

          <button className="primary-button" onClick={() => setShowForm(true)}>
            + Add Employee
          </button>

          <button className="reset-button" onClick={resetEmployees}></button>
        </div>
        <div className="hero-decoration">✿</div>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <span>👥</span>
          <p>Total Employees</p>
          <h2>{employees.length}</h2>
        </div>

        <div className="stat-card">
          <span>◈</span>
          <p>Departments</p>
          <h2>{departments.length - 1}</h2>
        </div>

        <div className="stat-card">
          <span>₹</span>
          <p>Average Salary</p>
          <h2>₹{Math.round(averageSalary).toLocaleString()}</h2>
        </div>
      </section>

      <section className="directory">
        <div className="section-heading">
          <div>
            <p className="eyebrow">TEAM DIRECTORY</p>
            <h2>Meet your team</h2>
          </div>

          <span className="employee-count">
            {filteredEmployees.length} members
          </span>
        </div>

        <div className="filters">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
          >
            {departments.map((item) => (
              <option key={item} value={item}>
                {item === "All" ? "All Departments" : item}
              </option>
            ))}
          </select>
        </div>

        <div className="employee-grid">
          {filteredEmployees.map((employee) => (
            <article className="employee-card" key={employee.id}>
              <div className="card-top">
                <div className="avatar">{employee.name.charAt(0)}</div>
                <span className="employee-id">#{employee.id}</span>
              </div>

              <h3>{employee.name}</h3>
              <p className="department">{employee.department}</p>

              <div className="card-divider" />

              <p className="email">{employee.email}</p>

              <div className="salary">
                <span>Monthly salary</span>
                <strong>₹{employee.salary.toLocaleString()}</strong>
              </div>

              <button
                className="edit-button"
                onClick={() => {
                  setEditingEmployee(employee);
                  setShowForm(true);
                }}
              >
                Edit
              </button>

              <button
                className="delete-button"
                onClick={() => deleteEmployee(employee.id)}
              >
                Delete
              </button>
            </article>
          ))}
        </div>
      </section>

      {showForm && (
        <AddEmployeeForm
          onAdd={saveEmployee}
          onClose={() => {setShowForm(false);
            setEditingEmployee(null);}}
            editingEmployee={editingEmployee}
        />
      )}

      <footer>EmployeeSphere · Built with React + TypeScript</footer>
    </main>
  );
}

export default App;