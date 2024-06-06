import React, { useState, useRef, useEffect } from 'react';
import { MdAssignmentAdd } from "react-icons/md";
import "./TodoForm.css";

const TodoForm = ({ addTodo, t }) => {
  const [input, setInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const submitTodo = e => {
    e.preventDefault();
  
    if (!selectedCategory) {
      alert(t("todoForm.noCategoryMsg"));
      return;
    }
  
    addTodo(input, selectedCategory);
  
    setInput("");
  }

  return (
    <form className='TodoForm' onSubmit={submitTodo}>
      <MdAssignmentAdd size={22} className='todo-icon' onClick={submitTodo} />
      <input ref={inputRef} type='text' className='todo-input' placeholder={t("todoForm.inputPlaceholder")} value={input} onChange={(e) => setInput(e.target.value)} required />
      <select className='todo-dropdown' value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="">{t("todoForm.option1")}</option>
        <option value='personal'>{t("todoForm.option2")}</option>
        <option value='business'>{t("todoForm.option3")}</option>
      </select>
    </form>
  )
}

export default TodoForm;
