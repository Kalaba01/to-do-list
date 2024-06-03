const Todo = require('../models/todo');

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.params.userId });
    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.createTodo = async (req, res) => {
  try {
    const newTodo = new Todo({
      task: req.body.task,
      userId: req.body.userId,
      completed: false,
      isEditing: false,
    });
    const todo = await newTodo.save();
    res.json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ msg: 'Todo not found' });
    }
    todo.task = req.body.task || todo.task;
    todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
    todo.isEditing = req.body.isEditing !== undefined ? req.body.isEditing : todo.isEditing;
    await todo.save();
    res.json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ msg: 'Todo not found' });
    }
    await todo.remove();
    res.json({ msg: 'Todo removed' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
