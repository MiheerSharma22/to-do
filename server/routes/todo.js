const express = require("express");
const router = express.Router();

// import controllers
const {
  addTodo,
  updateTodoTitle,
  updateTodoChecked,
  deleteTodo,
  getAllTodos,
} = require("../controllers/Todo");
const { signUp, login } = require("../controllers/User");

// define api routes
router.post("/addTodo", addTodo);
router.put("/updateTodoTitle", updateTodoTitle);
router.put("/updateTodoChecked", updateTodoChecked);
router.delete("/deleteTodo", deleteTodo);
router.get("/getAllTodos", getAllTodos);
router.post("/signUp", signUp);
router.post("/login", login);

module.exports = router;
