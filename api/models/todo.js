const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  task: {
    type: String,
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  isFavorite: {
    type: Boolean,
    default: false
  },
  isEditing: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    enum: ["personal", "business"],
    required: true
  },
  userId: {
    type: String,
    default: uuidv4,
    required: true
  }
}, { timestamps: true });

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
