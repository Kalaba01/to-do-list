import React from 'react';
import { TodoCard, TodoEdit } from "../index";
import { FaShare } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import "./TodoList.css";

const TodoList = ({ todos, deleteTodo, deleteAllTodos, readTask, editTodo, upgradeTodo, completeTodo, shareTodos }) => {
  return (
    <div className={`TodoList ${todos.length === 0 ? 'hidden' : ''}`}>
      <div className="icons">
        <span><FaShare onClick={()=>{shareTodos()}} size={20} /></span>
        <span><MdDelete size={20} onClick={()=>deleteAllTodos()} /></span>
      </div>
      {todos.map((todo, index) => (
        todo.isEditing ? (
          <TodoEdit upgradeTodo={upgradeTodo} todo={todo} key={index} />
        ) : (
          <TodoCard task={todo} key={index} deleteTodo={deleteTodo} readTask={readTask} editTodo={editTodo} completeTodo={completeTodo} />  
        )
      ))}
    </div>
  )
}

export default TodoList;
