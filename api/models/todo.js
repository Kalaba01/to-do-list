const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  task: { type: String, required: true },
  completed: { type: Boolean, default: false },
  isEditing: { type: Boolean, default: false },
  userId: { type: String, default: uuidv4 }
}, { timestamps: true });

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;
