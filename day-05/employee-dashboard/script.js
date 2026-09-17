async function loadEmployees() {
    const container = document.getElementById("employee-container");

    container.innerHTML = "<p>Loading employees...</p>";

    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch employee data");
        }

        const employees = await response.json();

        container.innerHTML = "";

        employees.forEach((employee) => {
            const card = document.createElement("div");

            card.className = "employee-card";

            card.innerHTML = `
                <h3>${employee.name}</h3>
                <p><strong>Email:</strong> ${employee.email}</p>
                <p><strong>Company:</strong> ${employee.company.name}</p>
                <p><strong>City:</strong> ${employee.address.city}</p>
            `;

            container.appendChild(card);
        });
    } catch (error) {
        container.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}