import React, { useState, useEffect } from "react";
import { TodoForm, TodoList, TodoFooter } from "../index";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import axios from "axios";
import "./TodoApp.css";

const TodoApp = () => {
  const { t } = useTranslation("global");

  const [todos, setTodos] = useState([]);
  const [userId, setUserId] = useState(() => {
    let id = localStorage.getItem("userId");
    if (!id) {
      id = uuidv4();
      localStorage.setItem("userId", id);
    }
    return id;
  });

  useEffect(() => {
    i18next.changeLanguage(navigator.language || navigator.userLanguage);
  }, []);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/${userId}`);
        setTodos(response.data.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, [userId]);

  const addTodo = async (task, category) => {
    try {
      const response = await axios.post("http://localhost:5000/", {
        task,
        category,
        userId,
      });
      setTodos([...todos, response.data.data]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const favoriteTodo = async (id) => {
    const todoToUpdate = todos.find((todo) => todo._id === id);
    try {
      const response = await axios.put(`http://localhost:5000/${id}`, {
        isFavorite: !todoToUpdate.isFavorite,
      });
      setTodos(todos.map((todo) => (todo._id === id ? response.data.data : todo)));
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const completeTodo = async (id) => {
    const todoToUpdate = todos.find((todo) => todo._id === id);
    try {
      const response = await axios.put(`http://localhost:5000/${id}`, {
        isCompleted: !todoToUpdate.isCompleted,
      });
      setTodos(todos.map((todo) => (todo._id === id ? response.data.data : todo)));
    } catch (error) {
      console.error("Error completing todo:", error);
    }
  };

  const editTodo = async (id) => {
    const todoToUpdate = todos.find((todo) => todo._id === id);
    try {
      const response = await axios.put(`http://localhost:5000/${id}`, {
        isEditing: !todoToUpdate.isEditing,
      });
      setTodos(todos.map((todo) => (todo._id === id ? response.data.data : todo)));
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };

  const upgradeTodo = async (task, category, id) => {
    try {
      const response = await axios.put(`http://localhost:5000/${id}`, {
        task,
        category,
        isEditing: false,
      });
      setTodos(todos.map((todo) => (todo._id === id ? response.data.data : todo)));
    } catch (error) {
      console.error("Error upgrading todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const deleteAllTodos = async () => {
    try {
      await axios.delete(`http://localhost:5000/user/${userId}`);
      setTodos([]);
    } catch (error) {
      console.error('Error deleting all todos:', error);
    }
  };

  const shareTodos = () => {
    if (todos.length > 0) {
      const mailBluePrint1 = t("todoList.mailBluePrint1");
      const mailBluePrint2 = t("todoList.mailBluePrint2");
      const mailBluePrint3 = t("todoList.mailBluePrint3");
      const mailBluePrint4 = t("todoList.mailBluePrint4");

      let emailBody = `${mailBluePrint1}\n\n`;
      for (let i = 0; i < todos.length; i++) {
        emailBody += `${mailBluePrint2} ${i + 1}) ${
          todos[i].task
        } ${mailBluePrint3} ${todos[i].category} ${mailBluePrint4} ${
          todos[i].isCompleted ? t("isCompleted") : t("incompleted")
        }\n`;
      }
      const mailtoLink = `mailto:?subject=My Todo List&body=${encodeURIComponent(
        emailBody
      )}`;
      window.location.href = mailtoLink;
    }
  };

  const readTodo = (task) => {
    const utterance = new SpeechSynthesisUtterance(task);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="TodoApp">
      <h1>{t("todoApp.header")}</h1>
      <TodoForm addTodo={addTodo} t={t} />
      <TodoList
        todos={todos}
        deleteTodo={deleteTodo}
        deleteAllTodos={deleteAllTodos}
        readTodo={readTodo}
        editTodo={editTodo}
        upgradeTodo={upgradeTodo}
        completeTodo={completeTodo}
        shareTodos={shareTodos}
        favoriteTodo={favoriteTodo}
        t={t}
      />
      <TodoFooter t={t} />
    </div>
  );
};

export default TodoApp;
