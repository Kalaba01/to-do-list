import React, { useState, useRef, useEffect } from "react";
import { TodoInput } from "../index";
import { MdAssignmentAdd } from "react-icons/md";

const TodoForm = ({ addTodo, t }) => {
  const [input, setInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [shake, setShake] = useState(false);
  const [error, setError] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const submitTodo = e => {
    e.preventDefault();

    if (!selectedCategory) {
      setShake(true);
      setError(true);
      setTimeout(() => {
        setShake(false);
        setError(false);
      }, 500);
      return;
    }

    addTodo(input, selectedCategory);
    setInput("");
    setSelectedCategory("");
    setError(false);
  }

  const dropdownOptions = {
    [t("todoForm.option1")]: "",
    [t("todoForm.option2")]: "personal",
    [t("todoForm.option3")]: "business"
  };

  return (
    <TodoInput
      input={input}
      setInput={setInput}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      formClass={`TodoForm ${shake ? 'shake' : ''}`}
      inputClass="todo-input"
      buttonClass="todo-icon"
      buttonIcon={<MdAssignmentAdd size={22} className="todo-icon" />}
      placeholder={t("todoForm.inputPlaceholder")}
      dropdownClass={`todo-dropdown ${error ? 'error' : ''}`}
      submitTodo={submitTodo}
      dropdownOptions={dropdownOptions}
    />
  );
}

export default TodoForm;
