import { Router } from 'express';
import { login } from '../../auth/utils.js';

const router = Router();

router.post('/login', async (req, res) => {
	try {
		const token = await login(req, res);
		res.send(token);
	} catch (e) {
		console.log(e);
		res.sendStatus(401);
	}
});

export default router;
