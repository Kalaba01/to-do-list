import React, { useState, useEffect } from 'react';
import { TodoForm, TodoList, TodoFooter } from "../index";
import { v4 as uuidv4 } from "uuid";
import axios from 'axios';

import "./TodoApp.css";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [userId, setUserId] = useState(() => {
    let id = localStorage.getItem('userId');
    if (!id) {
      id = uuidv4();
      localStorage.setItem('userId', id);
    }
    return id;
  });

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/${userId}`);
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, [userId]);

  const addTodo = async (task, category) => {
    try {
      const response = await axios.post('http://localhost:5000/', { task, category, userId });
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleFavorite  = async (id) => {
    const todoToUpdate = todos.find(todo => todo._id === id);
    try {
      const response = await axios.put(`http://localhost:5000/${id}`, { isFavorite: !todoToUpdate.isFavorite });
      setTodos(todos.map(todo => todo._id === id ? response.data : todo));
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const completeTodo = async (id) => {
    const todoToUpdate = todos.find(todo => todo._id === id);
    try {
      const response = await axios.put(`http://localhost:5000/${id}`, { completed: !todoToUpdate.completed });
      setTodos(todos.map(todo => todo._id === id ? response.data : todo));
    } catch (error) {
      console.error('Error completing todo:', error);
    }
  };

  const editTodo = async (id) => {
    const todoToUpdate = todos.find(todo => todo._id === id);
    try {
      const response = await axios.put(`http://localhost:5000/${id}`, { isEditing: !todoToUpdate.isEditing });
      setTodos(todos.map(todo => todo._id === id ? response.data : todo)); 
    } catch (error) {
      console.error('Error editing todo:', error);
    }
  };

  const upgradeTodo = async (task, id) => {
    try {
      const response = await axios.put(`http://localhost:5000/${id}`, { task, isEditing: false });
      setTodos(todos.map(todo => todo._id === id ? response.data : todo));
    } catch (error) {
      console.error('Error upgrading todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const shareTodos = () => {
    if (todos.length > 0) {
      let emailBody = "This is my todo list:\n\n";
      for (let i = 0; i < todos.length; i++) {
        emailBody += `${i + 1}) ${todos[i].task}\n`;
      }
      const mailtoLink = `mailto:?subject=My Todo List&body=${encodeURIComponent(emailBody)}`;
      window.location.href = mailtoLink;
    }
  }

  const deleteAllTodos = async () => {
    try {
      for (const todo of todos) {
        await axios.delete(`http://localhost:5000/${todo._id}`);
      }
      setTodos([]);
    } catch (error) {
      console.error('Error deleting all todos:', error);
    }
  }

  const readTask = (task) => {
    const utterance = new SpeechSynthesisUtterance(task);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className='TodoApp'>
      <h1>Get Things Done!</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList 
      todos={todos} 
      deleteTodo={deleteTodo} 
      deleteAllTodos={deleteAllTodos} 
      readTask={readTask} 
      editTodo={editTodo} 
      upgradeTodo={upgradeTodo} 
      completeTodo={completeTodo} 
      shareTodos={shareTodos} 
      toggleFavorite={toggleFavorite}
      />
      <TodoFooter />
    </div>
  )
}

export default TodoApp;
