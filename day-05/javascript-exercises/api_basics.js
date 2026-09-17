// Fetch API and JSON

async function fetchUsers() {
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        const users = await response.json();

        console.log("Total Users:", users.length);

        users.forEach((user) => {
            console.log("Name:", user.name);
            console.log("Email:", user.email);
            console.log("----------------");
        });
    } catch (error) {
        console.log("Error:", error.message);
    }
}

fetchUsers();