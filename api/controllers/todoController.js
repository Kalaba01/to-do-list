const todoService = require('../services/todoService');

const getTodos = async (req, res) => {
  try {
    const todos = await todoService.getTodos(req.params.userId);
    res.status(200).json({ status: 'success', data: todos });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Server Error' });
  }
};

const createTodo = async (req, res) => {
  try {
    const { task, category, userId } = req.body;
    if (!task || !category || !userId) {
      return res.status(400).json({ status: 'error', message: 'Please provide task, category, and userId' });
    }
    const todo = await todoService.createTodo({ task, category, userId });
    res.status(201).json({ status: 'success', data: todo });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Server Error' });
  }
};

const updateTodo = async (req, res) => {
  try {
    const todo = await todoService.updateTodo(req.params.id, req.body);
    res.status(200).json({ status: 'success', data: todo });
  } catch (err) {
    if (err.message === 'Todo not found') {
      res.status(404).json({ status: 'error', message: 'Todo not found' });
    } else {
      res.status(500).json({ status: 'error', message: 'Server Error' });
    }
  }
};

const deleteTodo = async (req, res) => {
  try {
    await todoService.deleteTodo(req.params.id);
    res.status(200).json({ status: 'success', message: 'Todo removed' });
  } catch (err) {
    if (err.message === 'Todo not found') {
      res.status(404).json({ status: 'error', message: 'Todo not found' });
    } else {
      res.status(500).json({ status: 'error', message: 'Server Error' });
    }
  }
};

const deleteAllTodosForUser = async (req, res) => {
  try {
    await todoService.deleteAllTodosForUser(req.params.userId);
    res.status(200).json({ status: 'success', message: 'All todos removed' });
  } catch (err) {
    if (err.message === 'No todos found for this user') {
      res.status(404).json({ status: 'error', message: 'No todos found for this user' });
    } else {
      res.status(500).json({ status: 'error', message: 'Server Error' });
    }
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  deleteAllTodosForUser
};
