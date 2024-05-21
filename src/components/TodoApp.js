import React from 'react'
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import TodoFooter from "./TodoFooter";
import "../styles/TodoApp.css";

const Todo = () => {
  return (
    <div className='TodoApp'>
      <h1>Get Things Done!</h1>
      <TodoForm />
      <TodoList />
      <TodoFooter />
    </div>
  )
}

export default Todo;
