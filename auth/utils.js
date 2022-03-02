import passport from 'passport';
import jwt from 'jsonwebtoken';

// wrapper around local authentication to use asynchronously
export function login(req, res) {
	return new Promise((resolve, reject) => {
		passport.authenticate('local', (err, user, info) => {
			if (err != null) return reject(err);
			if (!user) return reject(info);
			let token = jwt.sign(
				{
					id: user.id
				},
				process.env.JWT_SECRET_KEY
			);
			resolve(token);
		})(req, res);
	});
}

export function authenticated(req, res, next) {
	return passport.authenticate('jwt', { session: false })(req, res, next);
}

export function isUser(userId) {
	return (req, res, next) => {
		authenticated(req, res, () => {
			if (req.user == null || req.user.id != userId) return res.sendStatus(401);

			next();
		});
	};
}
