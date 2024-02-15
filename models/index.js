// DATABASE
const mongoose = require("mongoose");

mongoose.set("debug", true); // to see each steps and errors in the console

const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/todos_api";
mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
	console.log("Database connected");
});

mongoose.Promise = Promise; // this allows us to chain .then rather than calling callbacks

module.exports.Todo = require("./todo");
