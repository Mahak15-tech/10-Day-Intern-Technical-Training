# Day 7 – Next.js and Node.js Employee Dashboard

## 📌 Overview
 
**EmployeeSphere** is an employee management dashboard built with **Next.js** and **Node.js**.
 
It displays employee information from a REST API and provides search and department filtering.
 
## 📑 Table of Contents
 
- [Technologies Used](#️-technologies-used)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [How to Run](#️-how-to-run)
- [API Endpoint](#-api-endpoint)
- [Learning Outcomes](#-learning-outcomes)
- [Author](#-author)
## 🛠️ Technologies Used
 
| Layer    | Technology                      |
| -------- | ------------------------------- |
| Frontend | Next.js, React, TypeScript, CSS |
| Backend  | Node.js, Express.js             |
| Data     | REST API (JSON)                 |
 
## ✨ Features
 
- Display employee details
- Search employees by name
- Filter employees by department
- Calculate total employees
- Display total departments
- Display total salary
- Connect the frontend with the backend API
- Responsive dashboard design
## 📂 Project Structure
 
```text
day-07/
├── nextjs-app/
│   └── src/
│       └── app/
│           ├── page.tsx
│           ├── layout.tsx
│           └── globals.css
│
└── node-api/
    └── server.js
```
 
## ▶️ How to Run
 
### 1. Start the Node.js API
 
```bash
cd node-api
npm install
node server.js
```
 
The API runs at **http://localhost:5000**.
 
### 2. Start the Next.js application
 
Open a second terminal:
 
```bash
cd nextjs-app
npm install
npm run dev
```
 
The application runs at **http://localhost:3000**.
 
> **Note:** Start the API first so the dashboard can load employee data.
 
## 🔗 API Endpoint
 
| Method | Endpoint         | Description                                |
| ------ | ---------------- | ------------------------------------------ |
| `GET`  | `/api/employees` | Returns all employee information as JSON   |
 
**Example response**
 
```json
[
  {
    "id": 1,
    "name": "Aarav Sharma",
    "department": "Engineering",
    "salary": 45000
  }
]
```
 
## 📚 Learning Outcomes
 
- Understanding the Next.js App Router
- Using React state and effects
- Fetching data from REST APIs
- Creating a Node.js Express server
- Working with TypeScript
- Building responsive dashboards
## 👩‍💻 Author
 
**Mahak Sunil Kamble**
 
GitHub: [Mahak15-tech](https://github.com/Mahak15-tech)
 