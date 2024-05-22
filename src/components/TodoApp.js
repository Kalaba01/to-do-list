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

  const [history, setHistory] = useState([]);
  const [lastDeleted, setLastDeleted] = useState(null);

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
    const todoToDelete = todos.find(todo => todo.id === id);
    const indexToDelete = todos.findIndex(todo => todo.id === id);
    setLastDeleted({ todo: todoToDelete, index: indexToDelete });
    setTodos(todos.filter(todo => todo.id !== id));
  }

  useEffect(() => {
    const undoDelete = (e) => {
      if (e.ctrlKey && (e.key === 'z' || e.key === 'Z')) {
        if (lastDeleted) {
          setTodos([...todos.slice(0, lastDeleted.index), lastDeleted.todo, ...todos.slice(lastDeleted.index)]);
          setLastDeleted(null);
        } else if (history.length > 0) {
          setTodos(history[history.length - 1]);
          setHistory(history.slice(0, -1));
        }
      }
    };

    document.addEventListener('keydown', undoDelete);
    return () => {
      document.removeEventListener('keydown', undoDelete);
    };
  }, [history, lastDeleted, todos]);

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
    setHistory([todos]);
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
