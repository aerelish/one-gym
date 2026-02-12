/**
 * @notes
 * you can use # to import files from the src directory, for example:
 */

import { middleware } from '#middlewares/middlewares.js';
import express from 'express';

const app = express();
const port = process.env.PORT ?? '9001';

app.get('/', middleware);

app.get('/', (req, res) => {
	res.json({ message: 'Hello from Express!' });
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
