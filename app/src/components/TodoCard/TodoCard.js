import React from 'react';
import { MdEdit, MdDelete } from "react-icons/md";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import "./TodoCard.css";

const TodoCard = ({ task, deleteTodo, readTask, editTodo, completeTodo, toggleFavorite }) => {

  return (
    <div className={`TodoCard ${task.completed ? "completed" : "incompleted"}`}>
      {task.isFavorite ? <FaHeart className='icon' size={20} onClick={() => toggleFavorite(task._id)} /> : <FaRegHeart  className='icon' size={20} onClick={() => toggleFavorite(task._id)} />}
      <p onClick={() => completeTodo(task._id)}>{task.task}</p>
      <div>
        <MdEdit  className='icon' size={20} onClick={() => editTodo(task._id)} />
        <HiMiniSpeakerWave  className='icon' size={20} onClick={() => readTask(task.task)} />
        <MdDelete  className='icon' size={20} onClick={() => deleteTodo(task._id)} />
      </div>
    </div>
  )
}

export default TodoCard;
