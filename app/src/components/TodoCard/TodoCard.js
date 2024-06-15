import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import "./TodoCard.css";

const TodoCard = ({ task, deleteTodo, readTodo, editTodo, completeTodo, favoriteTodo, formatDateTime }) => {
  return (
    <div>
      <div className={`TodoCard ${task.isCompleted ? "completed" : "incompleted"}`}>
        {task.isFavorite ? <FaHeart className="icon" size={20} onClick={() => favoriteTodo(task._id)} /> : <FaRegHeart  className="icon" size={20} onClick={() => favoriteTodo(task._id)} />}
        <p onClick={() => completeTodo(task._id)}>{task.task}</p>
        <div>
          <MdEdit  className="icon" size={20} onClick={() => editTodo(task._id)} />
          <HiMiniSpeakerWave  className="icon" size={20} onClick={() => readTodo(task.task)} />
          <MdDelete  className="icon" size={20} onClick={() => deleteTodo(task._id)} />
        </div>
      </div>
      <div className="todo-dates">
        <span>Created at: {formatDateTime(task.createdAt)}</span>
        <span>Updated at: {formatDateTime(task.updatedAt)}</span>
      </div>
    </div>
  );
}

export default TodoCard;
