import React, { useState } from 'react';
import "../styles/TodoForm.css"
import { BiTask } from "react-icons/bi";

const TodoEdit = ({ upgradeTodo, todo }) => {
  const [input, setInput] = useState(todo.task);

  const submitTodo = e => {
    e.preventDefault();

    upgradeTodo(input, todo.id)

    setInput("");
  }

  return (
    <form className='TodoForm' onSubmit={submitTodo}>
      <input type='text' className='todo-input' placeholder='I need to...' value={input} onChange={(e) => setInput(e.target.value)} required />
      <button type="submit" className='todo-btn'><BiTask size={22} /></button>
    </form>
  )
}

export default TodoEdit;
