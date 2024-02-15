const mongoose = require("mongoose");

// Schema
// only name entry will need to be entered, the other two will be taken care of by mongoose because we set defaults
const todoSchema = new mongoose.Schema({
	name: {
		type: String,
		required: "Name cannot be blank!",
	},
	completed: {
		type: Boolean,
		default: false,
	},
	createdDate: {
		type: Date,
		default: Date.now,
	},
});

// Model
const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
