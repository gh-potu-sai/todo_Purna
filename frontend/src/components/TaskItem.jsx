import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const TaskItem = ({ task, onDelete, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title || '',
    description: task.description || '',
    dueDate: task.dueDate || '',
    priority: task.priority || 'Medium',
  });

  const isOverdue = !task.completed && new Date(task.dueDate) < new Date();
  const taskClass = `task ${task.completed ? 'completed' : isOverdue ? 'overdue' : ''}`;
  const priorityClass = (task.priority || 'Medium').toLowerCase();

  const handleToggle = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    onUpdate(task.id, {
      ...task,
      completed: !task.completed,
      username: storedUser?.username || '',
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    if (name === 'description' && value.length > 50) return;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    onUpdate(task.id, {
      ...task,
      ...editedTask,
      username: storedUser?.username || '',
    });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setEditedTask({
      title: task.title || '',
      description: task.description || '',
      dueDate: task.dueDate || '',
      priority: task.priority || 'Medium',
    });
    setIsModalOpen(false);
  };

  const truncatedDescription =
    task.description.length > 50 ? task.description.slice(0, 50) + '...' : task.description;

  return (
    <>
      <li className={taskClass}>
        <div className="task-content">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggle}
            className="task-checkbox"
            id={`checkbox-${task.id}`}
          />

          <div className="task-details">
            <strong>{task.title}</strong>
            <span className={`priority ${priorityClass}`}>
              {(task.priority || 'Medium')} Priority
            </span>

            <div style={{ maxWidth: '100%', wordWrap: 'break-word' }}>
              <p style={{ display: 'inline' }}>
                {showFullDescription ? task.description : truncatedDescription}
                {task.description.length > 50 && (
                  <span
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    style={{
                      marginLeft: '5px',
                      color: '#1B5886',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {showFullDescription ? 'Show Less' : 'Show More'}
                  </span>
                )}
              </p>
              <br />
              <small>Due: {new Date(task.dueDate).toLocaleString()}</small>
            </div>
          </div>

          <div className="task-actions">
            <button onClick={() => setIsModalOpen(true)}>Edit</button>
            <button onClick={() => onDelete(task.id)}>Delete</button>
          </div>
        </div>
      </li>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCancel}
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Edit Task</h2>
        <input
          name="title"
          value={editedTask.title}
          onChange={handleEditChange}
          placeholder="Task Title"
        />
        <input
          name="description"
          value={editedTask.description}
          onChange={handleEditChange}
          placeholder="Description (max 50 chars)"
          maxLength={50}
        />
        <small style={{ color: '#888' }}>
          {50 - editedTask.description.length} characters remaining
        </small>

        <input
          type="datetime-local"
          name="dueDate"
          value={editedTask.dueDate ? editedTask.dueDate.slice(0, 16) : ''}
          onChange={handleEditChange}
        />
        <select
          name="priority"
          value={editedTask.priority}
          onChange={handleEditChange}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <div className="modal-actions">
          <button onClick={handleCancel} className="cancel">Cancel</button>
          <button onClick={handleSave} className="save">Save</button>
        </div>
      </Modal>
    </>
  );
};

export default TaskItem;
