import React, { useState, useRef, useEffect } from 'react';
import "../styles/TodoForm.css"
import { MdAssignmentAdd } from "react-icons/md";

const TodoForm = ({ addTodo }) => {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const submitTodo = e => {
    e.preventDefault();

    addTodo(input)

    setInput("");
  }

  return (
    <form className='TodoForm' onSubmit={submitTodo}>
      <input ref={inputRef} type='text' className='todo-input' placeholder='I need to...' value={input} onChange={(e) => setInput(e.target.value)} required />
      <button type="submit" className='todo-btn'><MdAssignmentAdd size={22} /></button>
    </form>
  )
}

export default TodoForm;
