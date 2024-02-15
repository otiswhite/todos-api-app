// Load all todos from DB on load or reload
window.onload = async () => {
	try {
		const data = await (await fetch("/api/todos/")).json();
		addTodos(data);
		// event listener for new todo entry - pressed enter key
		document.querySelector("#todoInput").addEventListener("keypress", e => {
			if (e.which === 13) createTodo();
		});
	} catch (error) {
		console.log(error);
	}
};

// add all todos to the page
const addTodos = todos => {
	todos.forEach(todo => {
		addTodo(todo);
	});
};

// add a single todo to the page
const addTodo = todo => {
	const todosList = document.querySelector("#todo-list");
	const newTodo = document.createElement("li");
	const deleteTodo = document.createElement("span");
	deleteTodo.innerText = "X";
	newTodo.innerText = todo.name;
	newTodo.classList.add("task");
	if (todo.completed) newTodo.classList.add("done");
	newTodo.appendChild(deleteTodo);
	todosList.appendChild(newTodo);
	// event listener for completed / add/remove crossed text
	newTodo.addEventListener("click", () => {
		newTodo.classList.toggle("done");
		updateTodo(todo);
	});
	// event listener for delete todo - click on the x
	deleteTodo.addEventListener("click", e => {
		e.stopPropagation();
		newTodo.remove();
		removeTodo(todo);
	});
};

// create a todo in the db and show it on the page
const createTodo = async () => {
	try {
		const input = document.querySelector("#todoInput");
		const text = input.value.toString().trim();
		if (!text) {
			throw Error("todo name must be entered");
		}
		const newItem = await fetch("/api/todos/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: text,
			}),
		});
		const response = await newItem.json();
		addTodo(response);
		input.value = "";
	} catch (error) {
		console.log(error);
	}
};

// remove a todo from the database
const removeTodo = async todo => {
	try {
		await fetch(`/api/todos/${todo._id}`, {
			method: "DELETE",
		});
	} catch (error) {
		console.log(error);
	}
};

// update a todo in the db, completion status, crossed out text
const updateTodo = async todo => {
	try {
		await fetch(`/api/todos/${todo._id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				completed: !todo.completed,
			}),
		});
		// reload all the todos on the page so the completion status is correct
		const todos = document.querySelector("#todo-list");
		const data = await (await fetch("/api/todos/")).json();
		todos.innerHTML = "";
		addTodos(data);
	} catch (error) {
		console.log(error);
	}
};
