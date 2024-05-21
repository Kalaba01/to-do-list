import React from 'react';
import "../styles/TodoForm.css"
import { MdAssignmentAdd } from "react-icons/md";

const TodoForm = () => {
  return (
    <form className='TodoForm'>
      <input type='text' className='todo-input' placeholder='I need to...' required />
      <button type="submit" className='todo-btn'><MdAssignmentAdd size={22} /></button>
    </form>
  )
}

export default TodoForm;
