import { isUser } from '../../auth/utils.js';
import Todo from '../../models/todos.js';

export function parseId(req, _, next) {
	req.todoId = req.params.id;
	next();
}

export function getTodo(req, res, next) {
	parseId(req, res, async () => {
		const todo = await Todo.findById(req.todoId);
		if (todo == null) return res.sendStatus(404);
		req.todo = todo;
		await next();
	});
}

export function isTodoOwner(req, res, next) {
	getTodo(req, res, () => isUser(req.todo.owner)(req, res, next));
}

export function transformTodo(todo) {
	return {
		url: `${process.env.BASE_URL}/todos/${todo.id}`,
		ownerUrl: `${process.env.BASE_URL}/users/${todo.owner}`,
		description: todo.description,
		completed: todo.completed
	};
}
