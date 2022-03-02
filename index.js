import 'dotenv/config';
import './auth/index.js';
import express from 'express';
import todoRouter from './routes/todos/index.js';
import userRouter from './routes/users/index.js';
import authRouter from './routes/auth/index.js';

const PORT = process.env.port || 3000;

const app = express();

app.use(express.json());

// routes
app.use('/todos', todoRouter);
app.use('/users', userRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => console.log('App listening on port', PORT));
