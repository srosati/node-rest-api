import mongoose from 'mongoose';

async function config() {
	console.log('Connecting to db');
	try {
		await mongoose.connect(process.env.DB_URL);
		console.log('connected');
	} catch (e) {
		console.log(e);
	}
}

config();
