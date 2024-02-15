const db = require("../models");

// INDEX ROUTE - list all todos (GET)
exports.getTodos =
	("/",
	(req, res) => {
		db.Todo.find()
			.then(todos => {
				res.json(todos);
			})
			.catch(err => {
				res.send(err);
			});
	});

// POST ROUTE - create a new todo (POST)
exports.createTodo =
	("/",
	(req, res) => {
		db.Todo.create(req.body)
			.then(newTodo => {
				// 201 statu code means created
				res.status(201).json(newTodo);
			})
			.catch(err => {
				res.send(err);
			});
	});

// // SHOW / DETAILS ROUTE - show / retrieve a single todo (GET)
exports.getTodo =
	("/:todoId",
	(req, res) => {
		db.Todo.findById(req.params.todoId)
			.then(foundTodo => {
				res.json(foundTodo);
			})
			.catch(err => {
				res.send(err);
			});
	});

// // UPDATE ROUTE - update a single todo (PUT)
exports.updateTodo =
	("/:todoId",
	(req, res) => {
		db.Todo.findOneAndUpdate({ _id: req.params.todoId }, req.body, {
			new: true,
		})
			.then(todo => {
				res.json(todo);
			})
			.catch(err => {
				res.send(err);
			});
	});

// // DELETE ROUTE - delete a single todo (DELETE)
exports.deleteTodo =
	("/:todoId",
	(req, res) => {
		db.Todo.deleteOne({ _id: req.params.todoId })
			.then(() => {
				res.json({ message: "Todo deleted!" });
			})
			.catch(err => {
				res.send(err);
			});
	});

module.exports = exports;
