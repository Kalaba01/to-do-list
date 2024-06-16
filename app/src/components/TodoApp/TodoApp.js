import React, { useState, useEffect } from "react";
import { TodoForm, TodoList, TodoFooter, TodoUpload, TodoWelcome } from "../index";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import i18next from "i18next";
import axios from "axios";
import CryptoJS from "crypto-js";
import "./TodoApp.css";

const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;

const TodoApp = () => {
  const { t } = useTranslation("global"); // Used for translaation

  const [showMainApp, setShowMainApp] = useState(false);
  const [isUploadPopupOpen, setIsUploadPopupOpen] = useState(false);

  const [filter, setFilter] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [todos, setTodos] = useState([]);

  const [userId, setUserId] = useState(() => {
    let id = localStorage.getItem("userId");
    if (!id) {
      id = uuidv4();
      const hashedId = CryptoJS.AES.encrypt(id, SECRET_KEY).toString();
      localStorage.setItem("userId", hashedId);
      return hashedId;
    }
    return id;
  });

  // Hook used for translation
  useEffect(() => {
    i18next.changeLanguage(navigator.language || navigator.userLanguage);
  }, []);

  // Hook used for getting todos
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

  // Hook used for transition betwen welcome and main screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMainApp(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Function for filtering todos (favorites, category, completion status), used in TodoList component
  const filterTodos = (todos, filter, selectedCategory, selectedStatus) => {
    let filteredTodos = [...todos];
    switch (filter) {
      case "all":
        break;
      case "favorites":
        filteredTodos = filteredTodos.filter((todo) => todo.isFavorite);
        break;
      default:
        break;
    }
    if (selectedCategory === "personal" || selectedCategory === "business") {
      filteredTodos = filteredTodos.filter(
        (todo) => todo.category === selectedCategory
      );
    }
    if (selectedStatus === "completed" || selectedStatus === "incomplete") {
      const isCompleted = selectedStatus === "completed";
      filteredTodos = filteredTodos.filter(
        (todo) => todo.isCompleted === isCompleted
      );
    }
    return filteredTodos;
  };

  // Function for adding new todo, used in TodoCard component
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

  // Function for marking todo as favorite, used in TodoCard component
  const favoriteTodo = async (id) => {
    const todoToUpdate = todos.find((todo) => todo._id === id);
    try {
      const response = await axios.put(`http://localhost:5000/${id}`, {
        isFavorite: !todoToUpdate.isFavorite,
      });
      setTodos(
        todos.map((todo) => (todo._id === id ? response.data.data : todo))
      );
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  // Function for marking todo as completed/incompleted, used in TodoCard component
  const completeTodo = async (id) => {
    const todoToUpdate = todos.find((todo) => todo._id === id);
    try {
      const response = await axios.put(`http://localhost:5000/${id}`, {
        isCompleted: !todoToUpdate.isCompleted,
      });
      setTodos(
        todos.map((todo) => (todo._id === id ? response.data.data : todo))
      );
    } catch (error) {
      console.error("Error completing todo:", error);
    }
  };

  // Function for editing todo, used in TodoCard component
  const editTodo = async (id) => {
    const todoToUpdate = todos.find((todo) => todo._id === id);
    try {
      const response = await axios.put(`http://localhost:5000/${id}`, {
        isEditing: !todoToUpdate.isEditing,
      });
      setTodos(
        todos.map((todo) => (todo._id === id ? response.data.data : todo))
      );
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };

  // Function for editing todo (content, category), used in TodoCard component
  const upgradeTodo = async (task, category, id) => {
    try {
      const response = await axios.put(`http://localhost:5000/${id}`, {
        task,
        category,
        isEditing: false,
      });
      setTodos(
        todos.map((todo) => (todo._id === id ? response.data.data : todo))
      );
    } catch (error) {
      console.error("Error upgrading todo:", error);
    }
  };

  // Function for deleting single todo, used in TodoCard component
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Function for deleting all todos for specific user, used in TodoList component
  const deleteAllTodos = async () => {
    try {
      await axios.delete(`http://localhost:5000/user/${userId}`);
      setTodos([]);
    } catch (error) {
      console.error("Error deleting all todos:", error);
    }
  };

  // Function for sharing all todos via e-mail, used in TodoList component
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

  // Function used for reading todos a loud, used in TodoCard component
  const readTodo = (task) => {
    const utterance = new SpeechSynthesisUtterance(task);
    window.speechSynthesis.speak(utterance);
  };

  // Function for formating date that is displayed below todo, used in TodoCard component
  const formatDateTime = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Function for validating uploaded .csv file, used in TodoUpload component
  const validateFile = (data) => {
    const validCategories = ["personal", "business"];
    const invalidRow = data.find(row =>
      !row.task || !row.category || !validCategories.includes(row.category.toLowerCase())
    );
  
    const isValid = !invalidRow;
    const message = isValid ? "" : "Error in category column!";
    
    return { isValid, message };
  };

  // Function for sending valid .csv file content to backend, used in TodoUpload component
  const validateAndUploadTodos = async (data, userId) => {
    try {
      const response = await axios.post(`http://localhost:5000/upload/${userId}`, data, {
          headers: {
            "Content-Type": "application/json",
          },
      });
      setTodos([...todos, ...response.data.data]);
      return { success: true };
    } catch (error) {
      const errorMessage = error.response && error.response.status === 413
      ? "The file you tried to upload is too large."
      : "Error uploading file";
    
    return { success: false, message: errorMessage };
    }
  };

  return (
    <>
      <TodoWelcome t={t} onAnimationComplete={() => setShowMainApp(true)} />
      {showMainApp && (
        <motion.div
          initial={{ y: -window.innerHeight }}
          animate={{ y: 0 }}
          transition={{ duration: 2, delay: 1 }}
          className="TodoApp"
        >
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
            formatDateTime={formatDateTime}
            isVisible={!isUploadPopupOpen}
            t={t}
            filter={filter}
            setFilter={setFilter}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            filterTodos={filterTodos}
          />
          <TodoUpload
            validateAndUploadTodos={validateAndUploadTodos}
            validateFile={validateFile}
            userId={userId}
            isUploadPopupOpen={isUploadPopupOpen}
            setIsUploadPopupOpen={setIsUploadPopupOpen}
            t={t}
          />
          <TodoFooter t={t} />
        </motion.div>
      )}
    </>
  );
};

export default TodoApp;
