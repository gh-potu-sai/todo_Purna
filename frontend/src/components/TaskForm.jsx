import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [priority, setPriority] = useState('Medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !dueDate) return;

    const username = JSON.parse(localStorage.getItem('user')).username;

    onAdd({
      title,
      description,
      dueDate: dueDate.toISOString(),
      priority,
      completed: false,
      username,
    });

    setTitle('');
    setDescription('');
    setDueDate(null);
    setPriority('Medium');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-form-row">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="auth-input"
        />

        <div style={{ display: 'flex', gap: '20px', marginTop: '15px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <label htmlFor="dueDate" style={{ marginBottom: '4px', fontSize: '0.9rem', color: '#333' }}>
              Select
            </label>
            <DatePicker
              id="dueDate"
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
              showTimeSelect
              timeFormat="hh:mm aa"
              timeIntervals={15}
              dateFormat="yyyy-MM-dd hh:mm aa"
              placeholderText="Due Date"
              className="auth-input"
              required
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <label htmlFor="priority" style={{ marginBottom: '4px', fontSize: '0.9rem', color: '#333' }}>
              Priority
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="auth-input"
              required
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
      </div>

<div className="task-form-bottom" style={{ marginTop: '20px' }}>
  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
    <textarea
      placeholder="Task Description (max 50 characters)"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      maxLength={50}
      className="auth-input"
      rows={4}
      style={{ flex: 1 }}
    />
    <button type="submit" className="auth-button" style={{ height: '100%' }}>Add</button>
  </div>
</div>


    </form>
  );
};

export default TaskForm;
