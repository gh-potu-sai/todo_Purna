import React, { useState } from 'react';
import axios from '../services/api';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';
import { toast } from 'react-toastify';


const TaskList = ({ section, tasks, setTasks }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [selectedDueDate, setSelectedDueDate] = useState('');

  const addTask = async (task) => {
    try {
      const storedUser = localStorage.getItem('user');
      const username = storedUser ? JSON.parse(storedUser).username : '';
      const res = await axios.post(`/api/tasks?username=${username}`, task);
      setTasks((prev) => [...prev, res.data]);
      toast.success('Task added successfully!');
    } catch (error) {
      toast.error('Failed to add task.');
      console.error(error);
    }
  };


  
  const updateTask = async (id, updatedTask) => {
    try {
      const prevTask = tasks.find((task) => task.id === id); // Get old state

      const res = await axios.put(`/api/tasks/${id}`, updatedTask);
      const updated = res.data;
      if (!updated) throw new Error("No data returned");

      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updated : task))
      );

      // 🔍 Decide what to toast
      const onlyCompletionChanged =
        prevTask &&
        prevTask.completed !== updatedTask.completed &&
        prevTask.title === updatedTask.title &&
        prevTask.description === updatedTask.description &&
        prevTask.dueDate === updatedTask.dueDate &&
        prevTask.priority === updatedTask.priority;

      if (onlyCompletionChanged) {
        if (updatedTask.completed === true) {
          toast.success(" Task completed!");
        } else {
          toast.info(" Task marked incomplete");
        }
      } else {
        toast.info(" Task updated");
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Failed to update task.");
    }
  };







  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      toast.warn('Task deleted');
    } catch (err) {
      toast.error('Failed to delete task.');
    }
  };

  const clearFilters = () => {
    setFilter('all');
    setSearchTerm('');
    setSelectedPriority('');
    setSelectedDueDate('');
  };

  const count = {
    all: tasks.length,
    completed: tasks.filter((task) => task.completed).length,
    pending: tasks.filter((task) => !task.completed && new Date(task.dueDate) >= new Date()).length,
    overdue: tasks.filter((task) => !task.completed && new Date(task.dueDate) < new Date()).length,
  };

  const filteredTasks = tasks
    .filter((task) => {
      const isOverdue = !task.completed && new Date(task.dueDate) < new Date();
      if (filter === 'completed') return task.completed;
      if (filter === 'pending') return !task.completed && !isOverdue;
      if (filter === 'overdue') return isOverdue;
      return true;
    })
    .filter(
      (task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((task) => {
      if (selectedPriority && selectedPriority !== 'All') {
        return task.priority === selectedPriority;
      }
      return true;
    })
    .filter((task) => {
      if (selectedDueDate) {
        const taskDate = task.dueDate?.split('T')[0];
        return taskDate === selectedDueDate;
      }
      return true;
    });

  const completedPercentage =
    count.all === 0 ? 0 : Math.round((count.completed / count.all) * 100);
  const progressBarColor =
    completedPercentage < 40
      ? '#e53935'
      : completedPercentage < 80
      ? '#fbc02d'
      : '#388e3c';

  return (
    <>
      {section === 'form' && <TaskForm onAdd={addTask} />}
      {section === 'tasks' && (
        <>
          <div className="task-progress-container">
            <div className="progress-info">
              {count.completed} of {count.all} tasks completed ({completedPercentage}%)
            </div>
            <div className="progress-bar-background">
              <div
                className="progress-bar-fill"
                style={{
                  width: `${completedPercentage}%`,
                  backgroundColor: progressBarColor,
                }}
              ></div>
            </div>
          </div>

          <div className="search-filter-row">
            <input
              type="text"
              placeholder="Search by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
            >
              <option value="">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <input
              type="date"
              value={selectedDueDate}
              onChange={(e) => setSelectedDueDate(e.target.value)}
            />
            <button onClick={clearFilters}>Clear Filters</button>
          </div>

          <div className="filter-buttons">
            <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>
              All ({count.all})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={filter === 'completed' ? 'active' : ''}
            >
              Completed ({count.completed})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={filter === 'pending' ? 'active' : ''}
            >
              Pending ({count.pending})
            </button>
            <button
              onClick={() => setFilter('overdue')}
              className={filter === 'overdue' ? 'active' : ''}
            >
              Overdue ({count.overdue})
            </button>
          </div>

          <div className="task-list-scroll-container">
            <ul className="task-list">
              {filteredTasks.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#888' }}>No tasks found.</p>
              ) : (
                filteredTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onDelete={deleteTask}
                    onUpdate={updateTask}
                  />
                ))
              )}
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default TaskList;
