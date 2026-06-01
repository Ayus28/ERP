# ERP (Academic Management System)

A lightweight, modern, and bespoke private web application designed for academic management and student data tracking. This application features role-based access control, allowing both **Professors** and **Students** to access a customized dashboard.

---

## 🚀 Features

* **Role-Based Authentication:** Separate dashboards for Professors and Students with distinct permission levels.
* **Automatic Roll Number Allocation:** Professors don't need to manually enter roll numbers. The system automatically handles incremented roll numbers sequentially ($RollNo = LastRoll + 1$).
* **Dynamic Data Rendering:** Real-time updates to the student attendance registry using localized browser storage.
* **Secure Route Guards:** Automatic redirection to the login portal if an unauthenticated user tries to access the dashboard.
* **Responsive Modern UI:** Clean interface built with modern CSS gradients, Poppins typography, and smooth micro-interactions.

---

## 🔑 Default Credentials

To test the application, use the following pre-configured user credentials on the login portal:

| Role | Username / Selection | Password | Authorization Level |
| :--- | :--- | :--- | :--- |
| **Professor** | `👨‍🏫 Professor` | `admin123` | Full Access (Add, View, Delete Records) |
| **Student** | `👨‍🎓 Student` | `student123` | Read-Only Access (View Records Only) |

---

## 🛠️ Tech Stack & Architecture

* **Frontend UI:** Semantic HTML5, Custom CSS3 Grid & Flexbox layouts.
* **Typography:** Google Fonts (Poppins).
* **Application Logic:** Vanilla JavaScript (ES6+ integration).
* **Database Simulation:** Browser-bound `localStorage` API for persistent state management across sessions.

---

## 📂 Project Structure

```text
├── login.html      # The modern, gradient-styled authentication portal
├── index.html      # Dynamic dashboard interface layout components
├── script.js       # Core logical controller, authentication guards, and database engines
└── README.md       # Project documentation (This file)
