import User from '../../models/users.js';
import { transformUser } from './utils.js';

export async function list(_, res) {
	const users = await User.find();
	res.json(users.map(transformUser));
}

export async function findById(req, res) {
	const user = await User.findById(req.userId);
	if (user == null) return res.sendStatus(404);
	res.json(transformUser(user));
}

export async function create(req, res) {
	const { username, password } = req.body;
	try {
		const { id } = await User.create({ username, password });
		res.setHeader('Location', `${process.env.BASE_URL}/users/${id}`);
		res.sendStatus(200);
	} catch (e) {
		// Should check if error is actually a bad request,
		// error could potentialy be something else
		res.status(400);
		res.send(e.toString());
	}
}

export async function edit(req, res) {
	const { username, password } = req.body;
	try {
		const user = await User.edit(req.userId, { username, password });
		if (user == null) return res.sendStatus(404);

		res.json(transformUser(user));
	} catch (e) {
		res.status(400);
		res.send(e.toString());
	}
}

export async function remove(req, res) {
	const removed = await User.findByIdAndDelete(req.userId);
	if (!removed) return res.sendStatus(404);
	res.sendStatus(200);
}
