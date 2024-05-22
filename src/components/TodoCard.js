import React from 'react'
import { MdEdit, MdDelete } from "react-icons/md";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import "../styles/TodoCard.css";

const TodoCard = ({ task, deleteTodo, readTask, editTodo }) => {
  return (
    <div className='TodoCard'>
      <p>{task.task}</p>
      <div>
        <MdEdit size={20} onClick={()=>editTodo(task.id)} />
        <HiMiniSpeakerWave size={20} onClick={()=>readTask(task.task)} />
        <MdDelete size={20} onClick={()=>deleteTodo(task.id)} />
      </div>
    </div>
  )
}

export default TodoCard;
