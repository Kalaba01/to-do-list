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

const updateTodo = async (id, data) => {
  const todo = await Todo.findById(id);
  if (!todo) {
    throw new Error('Todo not found');
  }
  Object.assign(todo, data);
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

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  deleteAllTodosForUser
};
