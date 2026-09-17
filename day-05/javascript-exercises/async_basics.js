// Promises and Async/Await

function fetchEmployee() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                name: "Mahak",
                department: "Data Science"
            });
        }, 2000);
    });
}

async function displayEmployee() {
    console.log("Fetching employee data...");

    const employee = await fetchEmployee();

    console.log("Employee Data:", employee);
    console.log("Name:", employee.name);
    console.log("Department:", employee.department);
}

displayEmployee();