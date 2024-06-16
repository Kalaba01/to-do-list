const todoService = require("../services/todoService");

// Function for getting all todos for specific user
const getTodos = async (req, res) => {
  try {
    const todos = await todoService.getTodos(req.params.userId);
    res.status(200).json({ status: "success", data: todos });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Server Error" });
  }
};

// Function for creating new todo
const createTodo = async (req, res) => {
  try {
    const todo = await todoService.createTodo(req.body);
    res.status(201).json({ status: "success", data: todo });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Server Error" });
  }
};

// Function for editing existing todo (content, favorite, category, completion status)
const updateTodo = async (req, res) => {
  try {
    const updatedTodo = await todoService.updateTodo(req.params.id, req.body);
    res.status(200).json({ status: "success", data: updatedTodo });
  } catch (err) {
    if (err.kind === "ObjectId" || err.message === "Todo not found") {
      res.status(404).json({ status: "error", message: "Todo not found" });
    } else {
      res.status(500).json({ status: "error", message: "Server Error" });
    }
  }
};

// Function for deleting single todo
const deleteTodo = async (req, res) => {
  try {
    await todoService.deleteTodo(req.params.id);
    res.status(200).json({ status: "success", message: "Todo removed" });
  } catch (err) {
    if (err.message === "Todo not found") {
      res.status(404).json({ status: "error", message: "Todo not found" });
    } else {
      res.status(500).json({ status: "error", message: "Server Error" });
    }
  }
};

// Function for deleting all todos for specific user
const deleteAllTodosForUser = async (req, res) => {
  try {
    await todoService.deleteAllTodosForUser(req.params.userId);
    res.status(200).json({ status: "success", message: "All todos removed" });
  } catch (err) {
    if (err.message === "No todos found for this user") {
      res.status(404).json({ status: "error", message: "No todos found for this user" });
    } else {
      res.status(500).json({ status: "error", message: "Server Error" });
    }
  }
};

// Function for saving todos from uploaded .csv file
const uploadTodos = async (req, res) => {
  try {
    const todos = req.body;
    const userId = req.params.id;

    if (!Array.isArray(todos)) {
      return res.status(400).json({ status: "error", message: "Invalid data format" });
    }

    const uploadedTodos = await todoService.uploadTodos(todos, userId);
    res.status(200).json({ status: "success", data: uploadedTodos });
  } catch (error) {
    console.error("Error uploading todos:", error);
    res.status(500).json({ status: "error", message: "Server Error" });
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  deleteAllTodosForUser,
  uploadTodos
};
