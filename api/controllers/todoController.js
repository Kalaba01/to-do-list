const Todo = require('../models/todo');

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.params.userId });
    res.json(todos);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.createTodo = async (req, res) => {
  try {
    const { task, category, userId } = req.body;
    if (!task || !category || !userId) {
      return res.status(400).json({ msg: 'Please provide task, category, and userId' });
    }
    const newTodo = new Todo({
      task,
      category,
      userId,
      isCompleted: false,
      isEditing: false,
      isFavorite: false
    });
    const todo = await newTodo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ msg: 'Todo not found' });
    }
    const { task, isCompleted, isEditing, isFavorite } = req.body;
    todo.task = task || todo.task;
    todo.isCompleted = isCompleted !== undefined ? isCompleted : todo.isCompleted;
    todo.isEditing = isEditing !== undefined ? isEditing : todo.isEditing;
    todo.isFavorite = isFavorite !== undefined ? isFavorite : todo.isFavorite;
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const result = await Todo.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ msg: 'Todo not found' });
    }
    res.json({ msg: 'Todo removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
