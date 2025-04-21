import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import axios from 'axios';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState('date');
  const [sortOrder, setSortOrder] = useState('asc');

  // const fetchTodos = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:3001/todos?_page=${currentPage}&_limit=5&q=${searchTerm}&_sort=${sortField}&_order=${sortOrder}`);
  //     setTodos(response.data);
  //     const totalCount = response.headers['x-total-count'];
  //     setTotalPages(Math.ceil(totalCount / 5));
  //   } catch (error) {
  //     console.error('Error fetching todos:', error);
  //   }
  // };

  
  // const fetchTodos = async () => {
  //   try {
  //     setLoading(true);
  //     setError(null);
  //     const response = await axios.get(`http://localhost:3001/todos`, {
  //       params: {
  //         _page: currentPage,
  //         _limit: 5,
  //         q: searchTerm,
  //         _sort: sortField,
  //         _order: sortOrder
  //       }
  //     });
  //     setTodos(response.data);
  //     console.log('Todos loaded:', response.data);
      
  //     // For pagination, ensure your JSON server returns X-Total-Count header
  //     const totalCount = response.headers['x-total-count'] || response.data.length;
  //     setTotalPages(Math.ceil(totalCount / 5));
  //   } catch (error) {
  //     console.error('Error fetching todos:', error);
  //   }
  // }; 
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:3001/todos');
        setTodos(response.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching todos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);


  const addTodo = async (newTodo) => {
    try {
      const response = await axios.post('http://localhost:3001/todos', newTodo);
      setTodos([...todos, response.data]);
    } catch (err) {
      setError(err.message);
      console.error("Error adding todo:", err);
    }
  };

  // Update todo
  const updateTodo = async (id, updatedTodo) => {
    try {
      await axios.put(`http://localhost:3001/todos/${id}`, updatedTodo);
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, ...updatedTodo } : todo
      ));
    } catch (err) {
      setError(err.message);
      console.error("Error updating todo:", err);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError(err.message);
      console.error("Error deleting todo:", err);
    }
  };

  return (
    <div style={styles.app}>
      <h1 style={styles.header}>Todo List</h1>
      <TodoForm addTodo={addTodo} />
      <div style={styles.controls}>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          style={styles.searchInput}
        />
        <div style={styles.sortOptions}>
          <label style={styles.sortLabel}>Sort by:</label>
          <select 
            value={sortField} 
            onChange={(e) => setSortField(e.target.value)}
            style={styles.sortSelect}
          >
            <option value="task">Task Name</option>
            <option value="date">Date</option>
          </select>
          <select 
            value={sortOrder} 
            onChange={(e) => setSortOrder(e.target.value)}
            style={styles.sortSelect}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      <TodoList 
        todos={todos} 
        updateTodo={updateTodo} 
        deleteTodo={deleteTodo} 
      />
      <div style={styles.pagination}>
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
          disabled={currentPage === 1}
          style={styles.paginationButton}
        >
          Prev
        </button>
        <span style={styles.pageInfo}>Page {currentPage} of {totalPages}</span>
        <button 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
          disabled={currentPage === totalPages}
          style={styles.paginationButton}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const styles = {
  app: {
    maxWidth: '800px',
    margin: '0 auto',
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    textAlign: 'center',
    color: '#333'
  },
  controls: {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  searchInput: {
    padding: '8px',
    width: '200px',
    border: '1px solid #ddd',
    borderRadius: '4px'
  },
  sortOptions: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  sortLabel: {
    fontWeight: 'bold'
  },
  sortSelect: {
    padding: '5px'
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    marginTop: '20px'
  },
  paginationButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  pageInfo: {
    margin: '0 10px'
  }
};

export default App;