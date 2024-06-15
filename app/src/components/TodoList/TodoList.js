import React from "react";
import { TodoCard, TodoEdit } from "../index";
import { MdOutlineAttachEmail } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import "./TodoList.css";

const TodoList = ({ todos, deleteTodo, deleteAllTodos, readTodo, editTodo, upgradeTodo, completeTodo, shareTodos, favoriteTodo, formatDateTime, isVisible, filter, setFilter, selectedCategory, setSelectedCategory, selectedStatus, setSelectedStatus, filterTodos, t }) => {

  const filteredTodos = filterTodos(todos, filter, selectedCategory, selectedStatus);

  if (!isVisible) return null;

  return (
    <div className={`TodoList ${todos.length === 0 ? "hidden" : ""}`}>
      <div className="icons">
        <span><MdOutlineAttachEmail onClick={shareTodos} size={20} /></span>
        <span><MdDelete size={20} onClick={deleteAllTodos} /></span>
      </div>
      <div className="filter-options">
        <span onClick={() => setFilter("all")}>{t("todoList.clasicFilter1")}</span>
        <span onClick={() => setFilter("favorites")}>{t("todoList.clasicFilter2")}</span>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">{t("todoList.dropdownFilter1Option1")}</option>
          <option value="personal">{t("todoList.dropdownFilter1Option2")}</option>
          <option value="business">{t("todoList.dropdownFilter1Option3")}</option>
        </select>
        <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
          <option value="">{t("todoList.dropdownFilter2Option1")}</option>
          <option value="completed">{t("todoList.dropdownFilter2Option2")}</option>
          <option value="incomplete">{t("todoList.dropdownFilter2Option3")}</option>
        </select>
      </div>
      {filteredTodos.map((todo, index) => (
        todo.isEditing ? (
          <TodoEdit upgradeTodo={upgradeTodo} todo={todo} key={index} t={t} />
        ) : (
          <TodoCard 
            task={todo} 
            key={index} 
            deleteTodo={deleteTodo} 
            readTodo={readTodo} 
            editTodo={editTodo} 
            completeTodo={completeTodo} 
            favoriteTodo={favoriteTodo}
            formatDateTime={formatDateTime}
          />  
        )
      ))}
    </div>
  );
};

export default TodoList;
