import cors, { CorsOptions } from 'cors';

import { ENV } from './env.js';

const allowedOrigins = ENV.nodeEnv === 'production' ? [ENV.frontendUrl] : [ENV.devFrontendUrl];

const corsOptions: CorsOptions = {
	credentials: true, // allow cookies/auth headers
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	origin: allowedOrigins,
};

export default cors(corsOptions);
