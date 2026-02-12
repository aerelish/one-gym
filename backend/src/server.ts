/**
 * @notes
 * you can use # to import files from the src directory, for example:
 */

import { corsMiddleware, ENV, simpleLogger } from '#config/_config.js';
import express from 'express';

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(corsMiddleware);

// health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.listen(ENV.port, () => {
	simpleLogger.info(`Server running on http://localhost:${String(ENV.port)}`);
});
