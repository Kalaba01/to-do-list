const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

router.get("/:userId", todoController.getTodos); // Route to get individual tasks for specific user
router.post("/", todoController.createTodo); // Route for creating new todo
router.post("/upload/:id", todoController.uploadTodos); // Route for creating new todos from uploaded .csv file
router.put("/:id", todoController.updateTodo); // Route for updating existing todo
router.delete("/:id", todoController.deleteTodo); // Route for deleting single todo
router.delete("/user/:userId", todoController.deleteAllTodosForUser); // Route for deleting all todos for specific user

module.exports = router;
