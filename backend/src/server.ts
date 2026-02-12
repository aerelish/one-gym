import { corsMiddleware, ENV, simpleLogger } from '#config/_config.js';
import router from '#routes/v1/_routes.js';
import express from 'express';

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(corsMiddleware);

// health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// routes
app.use('/api/v1', router);

app.listen(ENV.port, () => {
	simpleLogger.info(`Server running on http://localhost:${String(ENV.port)}`);
});
