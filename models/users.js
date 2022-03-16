import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Todo from './todos.js';

const UserSchema = new mongoose.Schema({
	username: {
		type: 'string',
		required: true,
		unique: true
	},
	password: {
		type: 'string',
		required: true
	}
});

// Encrypt password when saving
UserSchema.pre('save', async function (next) {
	const user = this;
	if (!user.isModified('password')) return next();
	const encPassword = await bcrypt.hash(user.password, 10);
	user.password = encPassword;
	next();
});

// Delete user todos when deleting user
UserSchema.post('findOneAndDelete', async (doc) => {
	try {
		await Todo.deleteMany({ owner: doc.id }).exec();
	} catch (e) {
		console.error(e);
	}
});

UserSchema.statics.findByUsername = function (username) {
	return this.findOne({ username });
};

UserSchema.statics.edit = async function (id, { username, password }) {
	const user = await this.findById(id);
	if (user == null) return null;
	user.username = username;
	user.password = password;
	await user.save();
	return user;
};

export default mongoose.model('User', UserSchema);
