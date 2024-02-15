const express = require("express");
const router = express.Router();
// const db = require("../models");
const helpers = require("../helpers/todos");

// // INDEX AND POST ROUTES
router.route("/").get(helpers.getTodos).post(helpers.createTodo);

// // SHOW, UPDATE, DELETE ROUTES
router
	.route("/:todoId")
	.get(helpers.getTodo)
	.put(helpers.updateTodo)
	.delete(helpers.deleteTodo);

module.exports = router;
