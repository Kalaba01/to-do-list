// TodoList.js

import React, { useState, useEffect } from 'react';
import { TodoCard, TodoEdit } from "../index";
import { FaShare } from "react-icons/fa";
import { MdOutlineAttachEmail } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import "./TodoList.css";

const TodoList = ({ todos, deleteTodo, deleteAllTodos, readTask, editTodo, upgradeTodo, completeTodo, shareTodos, toggleFavorite }) => {
  const [filter, setFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const filterTodos = (todos, filter, selectedCategory, selectedStatus) => {
    let filteredTodos = [...todos];
    switch (filter) {
      case 'all':
        break;
      case 'favorites':
        filteredTodos = filteredTodos.filter(todo => todo.isFavorite);
        break;
      default:
        break;
    }
    if (selectedCategory === 'personal' || selectedCategory === 'business') {
      filteredTodos = filteredTodos.filter(todo => todo.category === selectedCategory);
    }
    if (selectedStatus === 'completed' || selectedStatus === 'incomplete') {
      const isCompleted = selectedStatus === 'completed';
      filteredTodos = filteredTodos.filter(todo => todo.completed === isCompleted);
    }
    return filteredTodos;
  };

  const filteredTodos = filterTodos(todos, filter, selectedCategory, selectedStatus);

  return (
    <div className={`TodoList ${todos.length === 0 ? 'hidden' : ''}`}>
      <div className="icons">
        <span><MdOutlineAttachEmail onClick={()=>{shareTodos()}} size={20} /></span>
        <span><MdDelete size={20} onClick={()=>deleteAllTodos()} /></span>
      </div>
      <div className="filter-options">
        <span onClick={() => setFilter('all')}>All</span>
        <span onClick={() => setFilter('favorites')}>Favorites</span>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">Category</option>
          <option value="personal">Personal</option>
          <option value="business">Business</option>
        </select>
        <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
          <option value="">Status</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>
      {filteredTodos.map((todo, index) => (
        todo.isEditing ? (
          <TodoEdit upgradeTodo={upgradeTodo} todo={todo} key={index} />
        ) : (
          <TodoCard 
            task={todo} 
            key={index} 
            deleteTodo={deleteTodo} 
            readTask={readTask} 
            editTodo={editTodo} 
            completeTodo={completeTodo} 
            toggleFavorite={toggleFavorite}
          />  
        )
      ))}
    </div>
  )
}

export default TodoList;
