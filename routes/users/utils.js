import { isUser } from '../../auth/utils.js';

export function parseId(req, res, next) {
	const id = parseInt(req.params.id);
	if (isNaN(id)) return res.sendStatus(404);
	req.userId = id;
	next();
}

export function isSameUser(req, res, next) {
	parseId(req, res, () => isUser(req.userId)(req, res, next));
}

export function transformUser(user) {
	return {
		url: `${process.env.BASE_URL}/users/${user.id}`,
		id: user.id,
		username: user.username
	};
}
