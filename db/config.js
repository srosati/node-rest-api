import mongoose from 'mongoose';

async function config() {
	console.log('Trying to conect to MongoDB database on', process.env.DB_URL);
	try {
		await mongoose.connect(process.env.DB_URL);
		console.log('Connected to database');
	} catch (e) {
		console.error(e);
	}
}

config();
