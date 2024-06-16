import React from "react";
import { TodoEdit, TodoCard } from "../index";

const TodoContent = ({ todo, upgradeTodo, deleteTodo, readTodo, editTodo, completeTodo, favoriteTodo, formatDateTime, t }) => {
  return todo.isEditing ? (
    <TodoEdit upgradeTodo={upgradeTodo} todo={todo} t={t} />
  ) : (
    <TodoCard 
      task={todo}
      deleteTodo={deleteTodo}
      readTodo={readTodo}
      editTodo={editTodo}
      completeTodo={completeTodo}
      favoriteTodo={favoriteTodo}
      formatDateTime={formatDateTime}
    />
  );
};

export default TodoContent;
