import React from 'react'
import { FaShare } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import "../styles/TodoList.css"
import TodoCard from './TodoCard';
import TodoEdit from './TodoEdit';

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
