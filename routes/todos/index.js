import { Router } from 'express';
import { authenticated } from '../../auth/utils.js';
import Todo from '../../models/todos.js';
import { getTodo, isTodoOwner, transformTodo } from './utils.js';

const router = Router();

router.get('/', async (_, res) => {
	const todos = await Todo.find();
	res.json(todos.map(transformTodo));
});

router.get('/:id', getTodo, (req, res) => {
	res.json(transformTodo(req.todo));
});

router.post('/', authenticated, async (req, res) => {
	const { description } = req.body;
	try {
		console.log(req.user);
		const { id } = await Todo.create({ owner: req.user._id, description });
		res.setHeader('Location', `${process.env.BASE_URL}/todos/${id}`);
		res.sendStatus(201);
	} catch (e) {
		res.status(400);
		res.send(e.toString());
	}
});

router.put('/:id', isTodoOwner, async (req, res) => {
	const { description, completed } = req.body;
	try {
		const todo = await Todo.edit(req.todoId, { description, completed });
		if (todo == null) return res.sendStatus(404);

		res.json(transformTodo(todo));
	} catch (e) {
		res.status(400);
		res.send(e.toString());
	}
});

router.delete('/:id', isTodoOwner, async (req, res) => {
	let removed = await Todo.findByIdAndDelete(req.todoId);
	if (!removed) return res.sendStatus(404);
	res.sendStatus(200);
});

export default router;
