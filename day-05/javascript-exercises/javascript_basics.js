// JavaScript Basics

let name = "Mahak";
let age = 21;

console.log("Name:", name);
console.log("Age:", age);

// Function
function greetUser(username) {
    return "Hello, " + username + "!";
}

console.log(greetUser(name));

// Array
let employees = ["Mahak", "Riya", "Amit"];

console.log("Employees:", employees);
console.log("Total Employees:", employees.length);

// Loop
for (let employee of employees) {
    console.log("Employee:", employee);
}