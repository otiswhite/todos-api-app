// if in development mode require dotenv package and add the environment variables to the process.env
if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}
const express = require("express"), // server framework for node
	mongoose = require("mongoose"), // library for working with mongodb
	app = express(), // server framework for node
	port = process.env.PORT || 5000,
	path = require("path"); // node build-in module for handling and transforming paths

app.use(express.json()); // body parser, build-in middleware function in Express
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "views"))); // setting up static asset - need to include in boilerplate as script tag - public folder (for files to be accesible to the browser such as js, css, images), setting _dirname path so it can be accessed when app run from different folders
app.use(express.static(path.join(__dirname, "public"))); // setting up static asset - need to include in boilerplate as script tag - public folder (for files to be accesible to the browser such as js, css, images), setting _dirname path so it can be accessed when app run from different folders

// TODO ROUTES API
const todoRoutes = require("./routes/todos");
app.use("/api/todos", todoRoutes);

// ROUTES INDEX HTML FILE
app.get("/", (req, res) => {
	res.sendFile("index.html"); // Other ways without setting static server separatelly: // res.sendFile(path.join(__dirname, "views", "home.html")); // res.sendFile(path.join(__dirname, "views/home.html"));
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
