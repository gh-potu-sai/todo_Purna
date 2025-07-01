# ✅ Todo_Purna

## 📌 Project Description

**Todo_Purna** is a full-stack ToDo List application built using **React.js** (frontend) and **Spring Boot with JWT authentication** (backend). It allows users to securely register/login and manage their tasks with features like due dates, priorities, filtering, and responsive UI.

> Developed by **Potu Purna Sai** as part of a Java Full Stack Assignment.

---

## 🚀 Installation Instructions

### 🔧 Prerequisites

- Node.js (v18+)
- Java 21
- Maven 3.9+
- MySQL Server

---

### 📦 Backend Setup

```bash
cd backend
# Create MySQL DB `tododb` first
mvn spring-boot:run
```

### 💻 Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 🔑 How to Use

1. Register a new account
2. Login with your credentials
3. Create tasks with title, description, due date, and priority
4. Edit, delete, or mark tasks as complete
5. Filter tasks by:
   - Status (Completed / Pending / Overdue)
   - Priority
   - Due Date
6. View task progress bar
7. Logout securely

---

## ✨ Features

- ✅ JWT-based Login/Register authentication
- ✅ Add/Edit/Delete tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Filter by status, priority, and due date
- ✅ Search tasks by title/description
- ✅ Responsive UI (mobile-friendly)
- ✅ Toast alerts, modal popups, and progress indicators

---

## 🖼️ Screenshots

### 🔐 Login Page  
![Login](https://github.com/gh-potu-sai/todo_Purna/blob/main/screenshots/Login.png?raw=true)

### 📝 Registration Page  
![Registration](https://github.com/gh-potu-sai/todo_Purna/blob/main/screenshots/Registration.png?raw=true)

### 🎯 Task Manager Dashboard  
![Task Manager](https://github.com/gh-potu-sai/todo_Purna/blob/main/screenshots/Task_Manager.png?raw=true)

### ➕ Add Task  
![Add Task](https://github.com/gh-potu-sai/todo_Purna/blob/main/screenshots/Add_Task.png?raw=true)

### 🛠 Edit Task  
![Edit Task](https://github.com/gh-potu-sai/todo_Purna/blob/main/screenshots/Edit_Task.png?raw=true)

### ✅ Task Items (Check, Edit, Delete)  
![Task Items](https://github.com/gh-potu-sai/todo_Purna/blob/main/screenshots/Task_Items.png?raw=true)

### 🔍 Search and Filter Tasks  
![Search & Filter](https://github.com/gh-potu-sai/todo_Purna/blob/main/screenshots/Search_Filter_Task.png?raw=true)

### 📁 Frontend Code Folder  
![Frontend Folder](https://github.com/gh-potu-sai/todo_Purna/blob/main/screenshots/Frontend_Folder.png?raw=true)

### 🗄 Backend Code Folder  
![Backend Folder](https://github.com/gh-potu-sai/todo_Purna/blob/main/screenshots/Backend_Folder.png?raw=true)

---

## 🧠 Technologies Used

### Frontend:
- React.js
- React Router DOM
- Axios
- Toastify
- React-DatePicker
- CSS + Media Queries

### Backend:
- Java 21
- Spring Boot
- Spring Data JPA
- Spring Security with JWT
- MySQL

---

## 🔐 Authentication Flow

- JWT token generated on login
- Stored in localStorage
- Axios sends token in headers
- Backend verifies token for protected routes

---

## 🤖 GitHub Copilot Usage

GitHub Copilot was used to:
- Scaffold frontend components (forms, modals, layout)
- Generate backend service and controller logic
- Suggest regex patterns and field validations
- Style media queries and UI feedback

---

## 🗂️ Folder Structure

```
todo_Purna/
├── backend/
│   └── Spring Boot backend code
├── frontend/
│   └── React frontend code
├── screenshots/
│   └── All UI screenshots
└── README.md
```

---

## 👤 Author

**Potu Purna Sai**  
📧 _[Add email or LinkedIn]_  
🔗 GitHub: [gh-potu-sai](https://github.com/gh-potu-sai)

---

## 📄 License

This project is open-source and intended for academic and learning purposes.