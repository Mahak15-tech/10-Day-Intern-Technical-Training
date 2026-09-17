const state = {
  employees: [],
  searchTerm: "",
  departmentFilter: "all",
  sortField: "name",
  sortDirection: "asc",
  editingId: null,
};

const els = {
  tableBody: document.getElementById("employee-table-body"),
  searchInput: document.getElementById("search-input"),
  departmentSelect: document.getElementById("department-filter"),
  sortSelect: document.getElementById("sort-field"),
  sortDirectionBtn: document.getElementById("sort-direction"),
  form: document.getElementById("employee-form"),
  formTitle: document.getElementById("form-title"),
  nameInput: document.getElementById("input-name"),
  departmentInput: document.getElementById("input-department"),
  salaryInput: document.getElementById("input-salary"),
  emailInput: document.getElementById("input-email"),
  cancelEditBtn: document.getElementById("cancel-edit"),
  errorBox: document.getElementById("error-box"),
  detailsPanel: document.getElementById("details-panel"),
  statTotal: document.getElementById("stat-total"),
  statAvgSalary: document.getElementById("stat-avg-salary"),
  statDepartments: document.getElementById("stat-departments"),
};

function showError(message) {
  els.errorBox.textContent = message;
  els.errorBox.classList.remove("hidden");
  setTimeout(() => els.errorBox.classList.add("hidden"), 4000);
}

function getVisibleEmployees() {
  let list = [...state.employees];

  if (state.searchTerm.trim()) {
    const term = state.searchTerm.trim().toLowerCase();
    list = list.filter((e) => e.name.toLowerCase().includes(term));
  }

  if (state.departmentFilter !== "all") {
    list = list.filter((e) => e.department === state.departmentFilter);
  }

  list.sort((a, b) => {
    const dir = state.sortDirection === "asc" ? 1 : -1;
    const field = state.sortField;
    if (typeof a[field] === "number") {
      return (a[field] - b[field]) * dir;
    }
    return a[field].localeCompare(b[field]) * dir;
  });

  return list;
}

function renderTable() {
  const visible = getVisibleEmployees();
  els.tableBody.innerHTML = "";

  if (visible.length === 0) {
    els.tableBody.innerHTML = `<tr><td colspan="5" class="empty-row">No employees match your filters.</td></tr>`;
    return;
  }

  for (const emp of visible) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${emp.name}</td>
      <td>${emp.department}</td>
      <td>${emp.salary.toLocaleString()}</td>
      <td>${emp.email || "—"}</td>
      <td class="actions">
        <button data-action="view" data-id="${emp.id}">View</button>
        <button data-action="edit" data-id="${emp.id}">Edit</button>
        <button data-action="delete" data-id="${emp.id}" class="danger">Delete</button>
      </td>
    `;
    els.tableBody.appendChild(row);
  }
}

function renderStats() {
  const count = state.employees.length;
  const avg = count
    ? Math.round(state.employees.reduce((sum, e) => sum + e.salary, 0) / count)
    : 0;
  const departments = new Set(state.employees.map((e) => e.department));

  els.statTotal.textContent = count;
  els.statAvgSalary.textContent = avg.toLocaleString();
  els.statDepartments.textContent = departments.size;
}

function renderDepartmentOptions() {
  const departments = [...new Set(state.employees.map((e) => e.department))].sort();
  const current = els.departmentSelect.value || "all";
  els.departmentSelect.innerHTML =
    `<option value="all">All departments</option>` +
    departments.map((d) => `<option value="${d}">${d}</option>`).join("");
  els.departmentSelect.value = current;
}

function renderDetails(emp) {
  if (!emp) {
    els.detailsPanel.innerHTML = `<p class="muted">Select "View" on an employee to see details here.</p>`;
    return;
  }
  els.detailsPanel.innerHTML = `
    <h3>${emp.name}</h3>
    <p><strong>Department:</strong> ${emp.department}</p>
    <p><strong>Salary:</strong> ${emp.salary.toLocaleString()}</p>
    <p><strong>Email:</strong> ${emp.email || "—"}</p>
    <p><strong>ID:</strong> ${emp.id}</p>
  `;
}

async function loadEmployees() {
  try {
    state.employees = await window.EmployeeAPI.getEmployees();
    renderDepartmentOptions();
    renderTable();
    renderStats();
  } catch (err) {
    showError(`Failed to load employees: ${err.message}`);
  }
}

function resetForm() {
  state.editingId = null;
  els.form.reset();
  els.formTitle.textContent = "Add Employee";
  els.cancelEditBtn.classList.add("hidden");
}

async function handleFormSubmit(event) {
  event.preventDefault();
  const payload = {
    name: els.nameInput.value,
    department: els.departmentInput.value,
    salary: els.salaryInput.value,
    email: els.emailInput.value,
  };

  try {
    if (state.editingId) {
      await window.EmployeeAPI.updateEmployee(state.editingId, payload);
    } else {
      await window.EmployeeAPI.createEmployee(payload);
    }
    resetForm();
    await loadEmployees();
  } catch (err) {
    showError(err.message);
  }
}

async function handleTableClick(event) {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const id = Number(button.dataset.id);
  const action = button.dataset.action;

  try {
    if (action === "view") {
      const emp = await window.EmployeeAPI.getEmployee(id);
      renderDetails(emp);
    } else if (action === "edit") {
      const emp = await window.EmployeeAPI.getEmployee(id);
      state.editingId = id;
      els.nameInput.value = emp.name;
      els.departmentInput.value = emp.department;
      els.salaryInput.value = emp.salary;
      els.emailInput.value = emp.email;
      els.formTitle.textContent = `Edit Employee #${id}`;
      els.cancelEditBtn.classList.remove("hidden");
      els.nameInput.focus();
    } else if (action === "delete") {
      if (!confirm("Delete this employee?")) return;
      await window.EmployeeAPI.deleteEmployee(id);
      await loadEmployees();
      renderDetails(null);
    }
  } catch (err) {
    showError(err.message);
  }
}

function attachEventListeners() {
  els.searchInput.addEventListener("input", (e) => {
    state.searchTerm = e.target.value;
    renderTable();
  });

  els.departmentSelect.addEventListener("change", (e) => {
    state.departmentFilter = e.target.value;
    renderTable();
  });

  els.sortSelect.addEventListener("change", (e) => {
    state.sortField = e.target.value;
    renderTable();
  });

  els.sortDirectionBtn.addEventListener("click", () => {
    state.sortDirection = state.sortDirection === "asc" ? "desc" : "asc";
    els.sortDirectionBtn.textContent = state.sortDirection === "asc" ? "↑ Asc" : "↓ Desc";
    renderTable();
  });

  els.form.addEventListener("submit", handleFormSubmit);
  els.cancelEditBtn.addEventListener("click", resetForm);
  els.tableBody.addEventListener("click", handleTableClick);
}

function init() {
  attachEventListeners();
  renderDetails(null);
  loadEmployees();
}

document.addEventListener("DOMContentLoaded", init);
