import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	completed: {
		type: Boolean,
		default: false
	},
	description: {
		type: String,
		required: true
	}
});

TodoSchema.statics.edit = async function (id, { description, completed }) {
	const todo = await this.findById(id);
	if (todo == null) return null;
	todo.description = description;
	todo.completed = completed;
	await todo.save();
	return todo;
};

export default mongoose.model('Todo', TodoSchema);
