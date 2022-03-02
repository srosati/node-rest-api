import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../db/users.js';

const validateToken = new JwtStrategy(
	{
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: process.env.JWT_SECRET_KEY
	},
	async (jwtPayload, done) => {
		const user = await User.get(jwtPayload.id);
		if (user == null) return done(null, false);

		return done(null, user);
	}
);

const login = new LocalStrategy(
	{
		usernameField: 'username',
		passwordField: 'password'
	},
	async (username, password, callback) => {
		const user = await User.getByUsername(username);
		if (user == null)
			return callback(null, false, { message: 'User not found' });
		if (user.password !== password)
			return callback(null, false, { message: 'Incorrect password' });

		return callback(null, user);
	}
);

passport.use(validateToken);
passport.use(login);
