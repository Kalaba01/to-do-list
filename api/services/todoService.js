const Todo = require("../models/todo");
const CryptoJS = require("crypto-js");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

// Function for decrypting
const decryptUUID = (hash) => {
  const bytes = CryptoJS.AES.decrypt(hash, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

// Function for getting all todos for specific user
const getTodos = async (hash) => {
  const userId = decryptUUID(hash);
  return await Todo.find({ userId });
};

// At the current project logic, this function doesn"t have usage because by default the user is displayed all todos and then depending on the user interaction the todos are filtered (on frontend) by category, favorites and completion status. In case of project logic change, this function can be used to get todos of a specific category

const getTodosByCategory = async (hash, category) => {
  const userId = decryptUUID(hash);
  const validCategories = ["personal", "business"];
  if (!validCategories.includes(category.toLowerCase())) {
    throw new Error("Invalid category");
  }

  return await Todo.find({ userId, category: category.toLowerCase() });
};

// Function for creating new todo
const createTodo = async ({ task, category, userId: hash }) => {
  const userId = decryptUUID(hash);
  const newTodo = new Todo({
    task,
    category,
    userId,
    isCompleted: false,
    isEditing: false,
    isFavorite: false
  });
  return await newTodo.save();
};

// Function for editing existing todo (content, favorite, category, completion status)
const updateTodo = async (id, { task, category, isFavorite, isCompleted, isEditing }) => {
  const todo = await Todo.findById(id);
  if (!todo) {
    throw new Error("Todo not found");
  }

  todo.task = task !== undefined ? task : todo.task;
  todo.category = category !== undefined ? category : todo.category;
  todo.isFavorite = isFavorite !== undefined ? isFavorite : todo.isFavorite;
  todo.isCompleted = isCompleted !== undefined ? isCompleted : todo.isCompleted;
  todo.isEditing = isEditing !== undefined ? isEditing : todo.isEditing;

  return await todo.save();
};

// Function for deleting single todo
const deleteTodo = async (id) => {
  const result = await Todo.deleteOne({ _id: id });
  if (result.deletedCount === 0) {
    throw new Error("Todo not found");
  }
  return result;
};

// Function for deleting all todos for specific user
const deleteAllTodosForUser = async (hash) => {
  const userId = decryptUUID(hash);
  const result = await Todo.deleteMany({ userId });
  if (result.deletedCount === 0) {
    throw new Error("No todos found for this user");
  }
  return result;
};

// Function for saving todos from uploaded .csv file
const uploadTodos = async (todos, hash) => {
  const userId = decryptUUID(hash);
  const validCategories = ["personal", "business"];
  const newTodos = [];

  todos.forEach(({ task, category }) => {
    if (!category || !validCategories.includes(category.toLowerCase())) {
      throw new Error("Invalid data format. Check category values.");
    }

    // At first glance, a more optimized solution would be to reuse the already existing createTodo function. However, the execution of the current code requires significantly fewer operations, which can be seen when comparing the time complexity:
    // 1) The current version effectively performs an O(1) operation for the entire dataset by using insertMany, as it inserts all todos in one go
    // 2) The version when createTodo function is used performs O(n) operations, where n is the number of todos, due to individual save operations

    newTodos.push({
      task,
      category,
      userId,
      isCompleted: false,
      isEditing: false,
      isFavorite: false
    });
  });

  const savedTodos = await Todo.insertMany(newTodos);
  return savedTodos;
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  deleteAllTodosForUser,
  uploadTodos,
  getTodosByCategory
};
