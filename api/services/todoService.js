const Todo = require('../models/todo');

const getTodos = async (userId) => {
  return await Todo.find({ userId });
};

const createTodo = async ({ task, category, userId }) => {
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

const updateTodo = async (id, { task, category, isFavorite, isCompleted, isEditing }) => {
  const todo = await Todo.findById(id);
  if (!todo) {
    throw new Error('Todo not found');
  }

  todo.task = task !== undefined ? task : todo.task;
  todo.category = category !== undefined ? category : todo.category;
  todo.isFavorite = isFavorite !== undefined ? isFavorite : todo.isFavorite;
  todo.isCompleted = isCompleted !== undefined ? isCompleted : todo.isCompleted;
  todo.isEditing = isEditing !== undefined ? isEditing : todo.isEditing;

  return await todo.save();
};

const deleteTodo = async (id) => {
  const result = await Todo.deleteOne({ _id: id });
  if (result.deletedCount === 0) {
    throw new Error('Todo not found');
  }
  return result;
};

const deleteAllTodosForUser = async (userId) => {
  const result = await Todo.deleteMany({ userId });
  if (result.deletedCount === 0) {
    throw new Error('No todos found for this user');
  }
  return result;
};

const uploadTodos = async (todos, userId) => {
  const validCategories = ['personal', 'business'];
  const newTodos = [];

  todos.forEach(({ task, category }) => {
    if (!category || !validCategories.includes(category.toLowerCase())) {
      throw new Error('Invalid data format. Check category values.');
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
