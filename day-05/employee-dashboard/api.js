const STORAGE_KEY = "employee-dashboard-data";
const NETWORK_DELAY_MS = 250;

const seedData = [
  { id: 1, name: "Asha Rao", department: "Engineering", salary: 55000, email: "asha.rao@example.com" },
  { id: 2, name: "Vikram Shah", department: "Sales", salary: 42000, email: "vikram.shah@example.com" },
  { id: 3, name: "Priya Nair", department: "Engineering", salary: 61000, email: "priya.nair@example.com" },
  { id: 4, name: "Neha Kulkarni", department: "Marketing", salary: 48000, email: "neha.kulkarni@example.com" },
  { id: 5, name: "Rohan Mehta", department: "Sales", salary: 39500, email: "rohan.mehta@example.com" },
];

function loadData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      // corrupted storage, fall back to seed data
    }
  }
  saveData(seedData);
  return [...seedData];
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function delay(value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), NETWORK_DELAY_MS));
}

function nextId(data) {
  return data.length ? Math.max(...data.map((e) => e.id)) + 1 : 1;
}

/** GET /employees */
async function getEmployees() {
  const data = loadData();
  return delay([...data]);
}

/** GET /employees/:id */
async function getEmployee(id) {
  const data = loadData();
  const found = data.find((e) => e.id === id);
  if (!found) {
    await delay(null);
    throw new Error(`Employee with id ${id} not found`);
  }
  return delay({ ...found });
}

/** POST /employees */
async function createEmployee({ name, department, salary, email }) {
  if (!name || !name.trim()) throw new Error("Name is required");
  const salaryNum = Number(salary);
  if (Number.isNaN(salaryNum) || salaryNum < 0) throw new Error("Salary must be a positive number");

  const data = loadData();
  const record = {
    id: nextId(data),
    name: name.trim(),
    department: (department || "Unassigned").trim(),
    salary: salaryNum,
    email: (email || "").trim(),
  };
  data.push(record);
  saveData(data);
  return delay(record);
}

/** PUT /employees/:id */
async function updateEmployee(id, updates) {
  const data = loadData();
  const index = data.findIndex((e) => e.id === id);
  if (index === -1) {
    await delay(null);
    throw new Error(`Employee with id ${id} not found`);
  }
  if (updates.salary !== undefined) {
    const salaryNum = Number(updates.salary);
    if (Number.isNaN(salaryNum) || salaryNum < 0) throw new Error("Salary must be a positive number");
    updates.salary = salaryNum;
  }
  data[index] = { ...data[index], ...updates };
  saveData(data);
  return delay(data[index]);
}

/** DELETE /employees/:id */
async function deleteEmployee(id) {
  const data = loadData();
  const index = data.findIndex((e) => e.id === id);
  if (index === -1) {
    await delay(null);
    throw new Error(`Employee with id ${id} not found`);
  }
  const [removed] = data.splice(index, 1);
  saveData(data);
  return delay(removed);
}

window.EmployeeAPI = {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
