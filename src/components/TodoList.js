import React from 'react'
import { FaShare } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import "../styles/TodoList.css"

const TodoList = () => {
  return (
    <div className='TodoList'>
      <div className="icons">
        <span><FaShare size={20} /></span>
        <span><MdDelete size={20} /></span>
      </div>
    </div>
  )
}

export default TodoList;
