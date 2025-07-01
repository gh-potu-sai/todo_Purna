<h1 align="center">📝 ToDo_App</h1>

<h2 align="center">📌 Project Description</h2>

<p align="center">
  <b>ToDo_App</b> is a full-stack ToDo List application built using <b>React.js</b> (frontend)
  and <b>Spring Boot with authentication and authorization</b> (backend). It allows users to securely register/login and manage their tasks with features like due dates, priorities, filtering, validations, and a responsive UI.
</p>

<p align="center">
  <i>Developed by <b>Potu Purna Sai</b> as part of a Java Full Stack Assignment.</i>
</p>

<hr/>



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
mvn clean install
mvn spring-boot:run
```

---

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

- ✅ Authentication & Authorization  
- ✅ Add/Edit/Delete tasks  
- ✅ Mark tasks as complete/incomplete  
- ✅ Filter by status, priority, and due date  
- ✅ Search tasks by title/description  
- ✅ Responsive UI (mobile-friendly)  
- ✅ Toast alerts, modal popups, and progress indicators  
- ✅ Input validations in both frontend and backend  

---

## 🖼️ Screenshots

### 🔐 Login & 📝 Registration
<p float="left">
  <img src="https://github.com/gh-potu-sai/todo_Purna/blob/main/screenshots/Login.png?raw=true" width="40%" height="400" />
  &nbsp;&nbsp;
  <img src="https://github.com/gh-potu-sai/todo_Purna/blob/main/screenshots/Registration.png?raw=true" width="40%" height="400" />
</p>

---

### 🎯 Task Manager Dashboard  
<img src="https://github.com/gh-potu-sai/todo_Purna/blob/main/screenshots/Task_Manager.png?raw=true" width="100%" />

---

### ➕ Add Task &  Edit Task 
<p float="left">
  <img src="https://github.com/gh-potu-sai/todo_Purna/blob/main/screenshots/Add_Task.png?raw=true" width="49%" height="400" />
  &nbsp;&nbsp;
  <img src="https://github.com/gh-potu-sai/todo_Purna/blob/main/screenshots/Edit_Task.png?raw=true" width="49%" height="400" />
</p>

---

### 🔍 Search and Filter Tasks  & Task Items (Check, Edit, Delete)

<table>
  <tr>
    <td style="width:35%; vertical-align:top;">
      <img src="https://github.com/gh-potu-sai/todo_Purna/blob/main/screenshots/Search_Filter_Task.png?raw=true" width="90%" height="250" />
    </td>
    <td style="width:65%; vertical-align:top;">
      <h4>How it Works:</h4>
      <ul>
        <li>Search bar allows you to filter tasks by <b>title</b> or <b>description</b>.</li>
        <li>Type in any keyword to instantly narrow down your task list.</li>
        <li>Search is case-insensitive and responsive.</li>
      </ul>
      <h4>Filters Available:</h4>
      <ul>
        <li><b>Status:</b> Completed / Pending / Overdue</li>
        <li><b>Priority:</b> High / Medium / Low</li>
        <li><b>Due Date:</b> Choose tasks based on deadlines</li>
      </ul>
    </td>
  </tr>
</table>


<table>
  <tr>
    <td style="width:45%; vertical-align:top;">
      <img src="https://github.com/gh-potu-sai/todo_Purna/blob/main/screenshots/Task_Items.png?raw=true" width="100%" height="400" />
    </td>
    <td style="width:55%; vertical-align:top;">
      <h4>What You Can Do:</h4>
      <ul>
        <li><b>Mark Complete:</b> Tick checkbox to mark a task as completed</li>
        <li><b>Edit:</b> Modify the task details including title, description, due date, and priority</li>
        <li><b>Delete:</b> Permanently remove a task with confirmation</li>
      </ul>
      <h4>Visual Indicators:</h4>
      <ul>
        <li><b>Color Tags:</b> Priority-based colors for High, Medium, and Low</li>
        <li><b>Strikethrough:</b> Completed tasks show with strike-through text</li>
        <li><b>Buttons:</b> Each task has Edit and Delete icons</li>
      </ul>
    </td>
  </tr>
</table>




## 🗂️ Folder Structure


<p float="left">
  <img src="https://github.com/gh-potu-sai/todo_Purna/blob/main/screenshots/Frontend_Folder.png?raw=true" width="45%" height="600" />
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img src="https://github.com/gh-potu-sai/todo_Purna/blob/main/screenshots/Backend_Folder.png?raw=true" width="45%" height="600" />
</p>

---

### 🧠 Technologies Used


| Frontend               | Backend             |
|------------------------|---------------------|
| React.js               | Java 21             |
| React Router DOM       | Spring Boot         |
| Axios                  | Spring Data JPA     |
| Toastify               | Spring Security     |
| React-DatePicker       | MySQL               |
| CSS + Media Queries    | Maven Build Tool    |

---

## 🔐 Authentication Flow

- Access token generated on login  
- Stored securely in localStorage  
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

## 👤 Author

**Potu Purna Sai**  
📧 potupurnasai7@gmail.com  
🔗 GitHub: [gh-potu-sai](https://github.com/gh-potu-sai)

---

## 📄 License

This project is open-source and intended for academic and learning purposes.
