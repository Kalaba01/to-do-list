const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const TodoSchema = new mongoose.Schema({
  task: { type: String, required: true },
  completed: { type: Boolean, default: false },
  isEditing: { type: Boolean, default: false },
  userId: { type: String, default: uuidv4 }
});

module.exports = mongoose.model('Todo', TodoSchema);
