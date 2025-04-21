import React, { useState } from 'react';

const TodoItem = ({ todo, updateTodo, deleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(todo.task);

  const handleUpdate = () => {
    updateTodo(todo.id, { task: editedTask });
    setIsEditing(false);
  };

  const getStatusStyle = () => {
    return {
      backgroundColor: todo.status ? '#e8f5e9' : '#ffebee',
      padding: '15px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    };
  };

  const getTypeColor = () => {
    const colors = {
      Office: '#ffcdd2',
      Personal: '#fff9c4',
      Family: '#c8e6c9',
      Friends: '#bbdefb',
      Other: '#f5f5f5'
    };
    return colors[todo.task_type] || '#f5f5f5';
  };

  return (
    <div style={{ ...getStatusStyle(), backgroundColor: getTypeColor() }}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h3>{todo.task}</h3>
          <p>User: {todo.username}</p>
          <p>Date: {todo.date}</p>
          <p>Status: {todo.status ? 'Completed' : 'Pending'}</p>
          <p>Type: {todo.task_type}</p>
          <div style={{ marginTop: '10px' }}>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button 
              onClick={() => deleteTodo(todo.id)}
              style={{ marginLeft: '10px', backgroundColor: '#ff5252', color: 'white' }}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
