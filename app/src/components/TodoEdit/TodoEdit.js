import React, { useState } from "react";
import { TodoInput } from "../index";
import { BiTask } from "react-icons/bi";

const TodoEdit = ({ upgradeTodo, todo, t }) => {
  const [input, setInput] = useState(todo.task);
  const [selectedCategory, setSelectedCategory] = useState(todo.category);

  const submitTodo = e => {
    e.preventDefault();
    upgradeTodo(input, selectedCategory, todo._id);
    setInput("");
  }

  const dropdownOptions = {
    [t("todoForm.option2")]: "personal",
    [t("todoForm.option3")]: "business"
  };

  return (
    <TodoInput
      input={input}
      setInput={setInput}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      formClass="TodoEdit"
      inputClass="todo-edit"
      buttonClass="todo-icon-edit"
      buttonIcon={<BiTask size={22} className="todo-icon-edit" />}
      placeholder={t("todoEdit.inputPlaceholder")}
      dropdownClass="todo-edit-dropdown"
      submitTodo={submitTodo}
      dropdownOptions={dropdownOptions}
    />
  );
}

export default TodoEdit;
