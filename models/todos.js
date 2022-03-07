// NOTE: methods here should be async and actually call whatever database is being used

const todos = [
	{
		id: 1,
		owner: 1,
		completed: true,
		description: 'Lorem ipsum dolor sit amet 1'
	},
	{
		id: 2,
		owner: 1,
		completed: true,
		description: 'Lorem ipsum dolor sit amet 2'
	},
	{
		id: 3,
		owner: 2,
		completed: false,
		description: 'Lorem ipsum dolor sit amet 3'
	}
];

async function list() {
	return todos;
}

async function get(id) {
	return todos.find((todo) => todo.id === id);
}

async function add({ owner, description }) {
	if (owner == null || description == null)
		throw new Error('Invalid parameters');

	const id = todos.length == 0 ? 1 : todos[todos.length - 1].id + 1;
	const todo = { id, owner, description, completed: false };
	todos.push(todo);
	return todo;
}

async function edit(id, description, completed) {
	if (description == null || completed == null)
		throw new Error('Invalid parameters');

	const todo = await get(id);
	if (todo == null) return null;
	todo.description = description;
	todo.completed = completed;
	return todo;
}

async function remove(id) {
	let idx = todos.findIndex((todo) => todo.id === id);
	if (idx === -1) return false;

	todos.splice(idx, 1);
	return true;
}

export default { list, get, add, edit, remove };
