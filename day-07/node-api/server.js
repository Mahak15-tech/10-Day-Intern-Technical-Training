const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const employees = [
  {
    id: 1,
    name: "Asha Rao",
    department: "IT",
    salary: 55000,
  },
  {
    id: 2,
    name: "Vikram Shah",
    department: "HR",
    salary: 48000,
  },
  {
    id: 3,
    name: "Priya Nair",
    department: "Finance",
    salary: 62000,
  },
];

app.get("/api/employees", (req, res) => {
  res.json(employees);
});

app.listen(5000, () => {
  console.log("Node API running on http://localhost:5000");
});