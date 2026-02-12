/**
 * @sampleUsage
 * import { middleware } from '#middlewares/middlewares.js';
 * app.get('/some-route', middleware);
 */

import { RequestHandler } from 'express';

export const middleware: RequestHandler = (req, res) => {
	res.send('Hello World!');
	console.log('Response sent');
};
