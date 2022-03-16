import Todo from '../../models/todos.js';
import { transformTodo } from './utils.js';

export async function list(_, res) {
	const todos = await Todo.find();
	res.json(todos.map(transformTodo));
}

export async function findById(req, res) {
	res.json(transformTodo(req.todo));
}

export async function create(req, res) {
	const { description } = req.body;
	try {
		const { id } = await Todo.create({ owner: req.user._id, description });
		res.setHeader('Location', `${process.env.BASE_URL}/todos/${id}`);
		res.sendStatus(201);
	} catch (e) {
		res.status(400);
		res.send(e.toString());
	}
}

export async function edit(req, res) {
	const { description, completed } = req.body;
	try {
		const todo = await Todo.edit(req.todoId, { description, completed });
		if (todo == null) return res.sendStatus(404);

		res.json(transformTodo(todo));
	} catch (e) {
		res.status(400);
		res.send(e.toString());
	}
}

export async function remove(req, res) {
	let removed = await Todo.findByIdAndDelete(req.todoId);
	if (!removed) return res.sendStatus(404);
	res.sendStatus(200);
}
