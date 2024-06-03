import React, { useState, useEffect, useRef } from 'react';
import "./TodoEdit.css";
import { BiTask } from "react-icons/bi";

const TodoEdit = ({ upgradeTodo, todo }) => {
  const [input, setInput] = useState(todo.task);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const submitTodo = e => {
    e.preventDefault();

    upgradeTodo(input, todo.id)

    setInput("");
  }

  return (
    <form className='TodoEdit' onSubmit={submitTodo}>
      <input ref={inputRef} type='text' className='todo-edit' placeholder='Update todo' value={input} onChange={(e) => setInput(e.target.value)} required />
      <button type="submit" className='todo-btn-edit'><BiTask size={22} /></button>
    </form>
  )
}

export default TodoEdit;
