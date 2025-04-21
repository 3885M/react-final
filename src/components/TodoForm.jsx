import React, { useState } from 'react';

const TodoForm = ({ addTodo }) => {
  const [task, setTask] = useState('');
  const [username, setUsername] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState(false);
  const [taskType, setTaskType] = useState('Office');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (task.trim().length < 3) newErrors.task = 'Task must be at least 3 characters';
    if (!username.trim()) newErrors.username = 'Username is required';
    if (!date.trim()) newErrors.date = 'Date is required';
    if (isNaN(date)) newErrors.date = 'Date must be a number';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addTodo({
        task,
        username,
        date,
        status: status ? 1 : 0,
        task_type: taskType
      });
      setTask('');
      setUsername('');
      setDate('');
      setStatus(false);
      setTaskType('Office');
    }
  };

  const formStyles = {
    todoForm: {
      marginBottom: '20px',
      padding: '20px',
      background: '#f9f9f9',
      borderRadius: '4px'
    },
    formGroup: {
      marginBottom: '15px'
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold'
    },
    input: {
      width: '100%',
      padding: '8px',
      border: '1px solid #ddd',
      borderRadius: '4px'
    },
    textarea: {
      width: '100%',
      padding: '8px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      minHeight: '60px'
    },
    select: {
      width: '100%',
      padding: '8px',
      border: '1px solid #ddd',
      borderRadius: '4px'
    },
    error: {
      color: 'red',
      fontSize: '0.8em',
      marginTop: '5px',
      display: 'block'
    },
    button: {
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      padding: '8px 12px',
      borderRadius: '4px',
      cursor: 'pointer'
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyles.todoForm}>
      <div style={formStyles.formGroup}>
        <label style={formStyles.label}>Task:</label>
        <textarea 
          value={task} 
          onChange={(e) => setTask(e.target.value)} 
          rows="3"
          style={formStyles.textarea}
        />
        {errors.task && <span style={formStyles.error}>{errors.task}</span>}
      </div>
      <div style={formStyles.formGroup}>
        <label style={formStyles.label}>Username:</label>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          style={formStyles.input}
        />
        {errors.username && <span style={formStyles.error}>{errors.username}</span>}
      </div>
      <div style={formStyles.formGroup}>
        <label style={formStyles.label}>Date:</label>
        <input 
          type="text" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          style={formStyles.input}
        />
        {errors.date && <span style={formStyles.error}>{errors.date}</span>}
      </div>
      <div style={formStyles.formGroup}>
        <label style={formStyles.label}>Status:</label>
        <input 
          type="checkbox" 
          checked={status} 
          onChange={(e) => setStatus(e.target.checked)} 
        />
        <span>{status ? 'Completed' : 'Pending'}</span>
      </div>
      <div style={formStyles.formGroup}>
        <label style={formStyles.label}>Task Type:</label>
        <select 
          value={taskType} 
          onChange={(e) => setTaskType(e.target.value)}
          style={formStyles.select}
        >
          <option value="Office">Office</option>
          <option value="Personal">Personal</option>
          <option value="Family">Family</option>
          <option value="Friends">Friends</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <button type="submit" style={formStyles.button}>Add Task</button>
    </form>
  );
};

export default TodoForm;