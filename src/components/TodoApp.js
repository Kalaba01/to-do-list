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
      <TodoList todos={todos} deleteTodo={deleteTodo} deleteAllTodos={deleteAllTodos} readTask={readTask} editTodo={editTodo} upgradeTodo={upgradeTodo} completeTodo={completeTodo} />
      <TodoFooter />
    </div>
  )
}

export default Todo;
