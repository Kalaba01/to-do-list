const todoService = require('../services/todoService');

const getTodos = async (req, res) => {
  try {
    const todos = await todoService.getTodos(req.params.userId);
    res.json(todos);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const createTodo = async (req, res) => {
  try {
    const { task, category, userId } = req.body;
    if (!task || !category || !userId) {
      return res.status(400).json({ msg: 'Please provide task, category, and userId' });
    }
    const todo = await todoService.createTodo({ task, category, userId });
    res.json(todo);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const updateTodo = async (req, res) => {
  try {
    const todo = await todoService.updateTodo(req.params.id, req.body);
    res.json(todo);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const deleteTodo = async (req, res) => {
  try {
    await todoService.deleteTodo(req.params.id);
    res.json({ msg: 'Todo removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const deleteAllTodosForUser = async (req, res) => {
  try {
    await todoService.deleteAllTodosForUser(req.params.userId);
    res.json({ msg: 'All todos removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  deleteAllTodosForUser
};
