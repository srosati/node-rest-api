import { isUser } from '../../auth/utils.js';

export function parseId(req, _, next) {
	req.userId = req.params.id;
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
