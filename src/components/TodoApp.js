import React, { useState, useEffect } from 'react'
import "../styles/TodoApp.css";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import TodoFooter from "./TodoFooter";
import { v4 as uuidv4 } from "uuid";

uuidv4();

const Todo = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const storageChange = () => {
      const savedTodos = localStorage.getItem('todos');
      setTodos(savedTodos ? JSON.parse(savedTodos) : []);
    };

    window.addEventListener('storage', storageChange);

    return () => {
      window.removeEventListener('storage', storageChange);
    };
  }, []);

  const addTodo = todo => {
    setTodos([...todos, { id: uuidv4(), task: todo, completed: false, isEditing: false }])
  }

  const completeTodo = id => {
    setTodos(todos.map(todo => todo.id === id ? {
      ...todo, completed: !todo.completed
    } : todo))
  }

  const editTodo = id => {
    setTodos(todos.map(todo => todo.id === id ? {
      ...todo, isEditing: !todo.isEditing
    } : todo))
  }

  const upgradeTodo = (task, id) => {
    setTodos(todos.map(todo => todo.id === id ? {
      ...todo, task, isEditing: !todo.isEditing
    } : todo))
  }

  const deleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

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

  const deleteAllTodos = () => {
    setTodos([]);
  }

  const readTask = (task) => {
    const utterance = new SpeechSynthesisUtterance(task);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className='TodoApp'>
      <h1>Get Things Done!</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} deleteAllTodos={deleteAllTodos} readTask={readTask} editTodo={editTodo} upgradeTodo={upgradeTodo} completeTodo={completeTodo} shareTodos={shareTodos} />
      <TodoFooter />
    </div>
  )
}

export default Todo;
