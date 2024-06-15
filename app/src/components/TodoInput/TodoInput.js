import React, { useEffect, useRef } from "react";
import "./TodoInput.css";

const TodoInput = ({ input, setInput, selectedCategory, setSelectedCategory, formClass, inputClass, buttonClass, buttonIcon, placeholder, dropdownClass, submitTodo, dropdownOptions }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <form className={`${formClass}`} onSubmit={submitTodo}>
      <button type="submit" className={buttonClass}>
        {buttonIcon}
      </button>
      <input
        ref={inputRef}
        type="text"
        className={inputClass}
        placeholder={placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        required
      />
      <select
        className={dropdownClass}
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {Object.entries(dropdownOptions).map(([text, value]) => (
          <option key={value} value={value}>{text}</option>
        ))}
      </select>
    </form>
  );
}

export default TodoInput;
