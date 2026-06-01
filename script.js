// Global security controller and engine trigger
document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userRole = localStorage.getItem("userRole");

    // Route Guard: Agar login nahi hai toh sidhe login page par phenko
    if (!isLoggedIn) {
        window.location.href = "login.html";
        return;
    }

    // Path cleanup controller (Handles paths safely everywhere)
    const currentPath = window.location.pathname.toLowerCase();

    // 1. Agar Student galat raste se professor page par aana chahe
    if (userRole === "student" && currentPath.includes("professor.html")) {
        window.location.href = "student.html";
        return;
    }

    // 2. Agar Professor student wale dashboard par chala jaye
    if (userRole === "professor" && currentPath.includes("student.html")) {
        window.location.href = "professor.html";
        return;
    }

    // Agar sab sahi hai, toh data render kar do
    renderStudents(userRole);
});

// Logic to add a student safely with Automatic sequential roll creation
function addStudent(event) {
    if (event) event.preventDefault();

    const userRole = localStorage.getItem("userRole");
    if (userRole !== "professor") {
        alert("Unauthorized access violation.");
        return;
    }

    const nameInput = document.getElementById("studentName");
    if (!nameInput) return;

    const nameValue = nameInput.value.trim();
    if (nameValue === "") {
        alert("Input parameter 'Name' cannot be empty.");
        return;
    }

    let students = JSON.parse(localStorage.getItem("students")) || [];

    // --- SEQUENTIAL AUTOMATIC ROLL ALLOCATION MATRIX ---
    let nextRoll = 1;
    if (students.length > 0) {
        const maxRoll = Math.max(...students.map(s => parseInt(s.roll) || 0));
        nextRoll = maxRoll + 1;
    }

    // Save transaction element
    students.push({
        name: nameValue,
        roll: nextRoll,
        date: new Date().toLocaleDateString(),
        status: "Present"
    });

    localStorage.setItem("students", JSON.stringify(students));
    nameInput.value = "";
    
    renderStudents(userRole);
}

// Global renderer parsing data objects into standard dashboard rows
function renderStudents(role) {
    const tableBody = document.getElementById("attendanceTableBody");
    if (!tableBody) return;

    let students = JSON.parse(localStorage.getItem("students")) || [];
    tableBody.innerHTML = "";

    students.forEach((student, index) => {
        const row = document.createElement("tr");

        // UI rendering variations depending on target file
        if (role === "professor") {
            row.innerHTML = `
                <td><b>#${student.roll}</b></td>
                <td>${student.name}</td>
                <td>${student.date || new Date().toLocaleDateString()}</td>
                <td><span style="color: #34d399; font-weight:600;">Present</span></td>
                <td><button class="delete-btn" onclick="deleteStudent(${index})">Delete</button></td>
            `;
        } else {
            row.innerHTML = `
                <td><b>#${student.roll}</b></td>
                <td>${student.name}</td>
                <td>${student.date || new Date().toLocaleDateString()}</td>
                <td><span class="badge">Present</span></td>
            `;
        }
        tableBody.appendChild(row);
    });
}

// Drop single element logic
function deleteStudent(index) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    
    const userRole = localStorage.getItem("userRole");
    renderStudents(userRole);
}

// Clear state configurations and redirect out
function handleLogout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    window.location.href = "login.html";
}
