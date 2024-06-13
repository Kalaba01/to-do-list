import React, { useState, useRef, useEffect } from 'react';
import { MdAssignmentAdd } from "react-icons/md";
import TodoInput from '../TodoInput/TodoInput';

const TodoForm = ({ addTodo, t }) => {
  const [input, setInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const submitTodo = e => {
    e.preventDefault();

    if (!selectedCategory) {
      alert(t("todoForm.noCategoryMsg"));
      return;
    }

    addTodo(input, selectedCategory);
    setInput("");
  }

  const dropdownOptions = {
    "Select Category": "",
    "Personal": "personal",
    "Business": "business"
  };

  return (
    <TodoInput
      input={input}
      setInput={setInput}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      formClass="TodoForm"
      inputClass="todo-input"
      buttonClass="todo-btn"
      buttonIcon={<MdAssignmentAdd size={22} className='todo-icon' />}
      placeholder={t("todoForm.inputPlaceholder")}
      dropdownClass="todo-dropdown"
      submitTodo={submitTodo}
      dropdownOptions={dropdownOptions}
    />
  );
}

export default TodoForm;
