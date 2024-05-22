import React, { useState } from 'react';
import "../styles/TodoForm.css"
import { MdAssignmentAdd } from "react-icons/md";

const TodoForm = ({addTodo}) => {
  const [input, setInput] = useState("");

  const submitTodo = e => {
    e.preventDefault();

    addTodo(input)

    setInput("");
  }

  return (
    <form className='TodoForm' onSubmit={submitTodo}>
      <input type='text' className='todo-input' placeholder='I need to...' value={input} onChange={(e) => setInput(e.target.value)} required />
      <button type="submit" className='todo-btn'><MdAssignmentAdd size={22} /></button>
    </form>
  )
}

export default TodoForm;
