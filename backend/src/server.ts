import app from '#app.js';
import { ENV, simpleLogger } from '#config/_config.js';

/**
 * * start the server
 * * listen on the specified port
 * * rest of the server logic is in app.ts
 */

app.listen(ENV.port, () => {
	simpleLogger.info(`Server running on http://localhost:${String(ENV.port)}`);
});
