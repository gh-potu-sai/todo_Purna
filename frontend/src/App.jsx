import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TaskList from './components/TaskList';
import Login from './components/Login';
import Register from './components/Register';
import LogoutButton from './components/LogoutButton';
import { ToastContainer } from 'react-toastify';
import axios from './services/api';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [, setUsername] = useState('');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const parsedUser = storedUser ? JSON.parse(storedUser) : {};
        const uname = parsedUser.username || '';
        setUsername(uname); // just to preserve if needed later

        const greetings = [

          `🙋‍♂️ Hi ${uname}, ready to plan?`,
          `🌟 Let’s get things done, ${uname}.`,
          `💼 Time to focus, ${uname}.`,
          `🚀 Let’s get started, ${uname}.`,
          `💡 Another productive day, ${uname}.`,
          `☀️ Rise and shine, ${uname}.`,
          `💪 Let's crush those tasks today, ${uname}!`,
          `🎯 Stay focused and conquer, ${uname}.`,
          `😊 You’ve got this, ${uname}.`,
          `🔥 Keep the momentum going, ${uname} !`,
          `📅 Another step toward your goals, ${uname}.`,
          `🙌 Make today count, ${uname}.`,
          `💻 Time to build something amazing, ${uname}.`,
          `🌈 Let's make it a good one, ${uname}.`,
          `🌟 Keep moving forward, ${uname}.`,

        ];
        const randomIndex = Math.floor(Math.random() * greetings.length);
        setGreeting(greetings[randomIndex]);

        const res = await axios.get(`/api/tasks?username=${uname}`);
        setTasks(res.data);
      } catch (err) {
        console.error('Error fetching tasks:', err);
      }
    };

    fetchTasks();
  }, []);

  const user = useMemo(() => localStorage.getItem('user'), []);

  return user ? (
    <div className="main-layout">
      {/* ✅ Top-left floating greeting */}
      <p className="user-greeting">{greeting}</p>

      <div className="left-wrapper" style={{ position: 'relative' }}>
        <div className="left-panel">
          <h1>Task Manager</h1>
          <TaskList section="form" tasks={tasks} setTasks={setTasks} />
        </div>
        <div className="left-quote">
          <p>“Dream It. Schedule It. Do It.”</p>
          <span>— Purna</span>
        </div>

        <LogoutButton />
      </div>

      <div className="right-panel">
        <TaskList section="tasks" tasks={tasks} setTasks={setTasks} />
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
};

function App() {
  return (
    <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<TaskPage />} />
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </Router>
  );
}

export default App;
