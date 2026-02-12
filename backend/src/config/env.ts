export const ENV = {
	devFrontendUrl: process.env.DEV_FRONTEND_URL ?? 'http://localhost:5173',
	nodeEnv: process.env.NODE_ENV ?? 'development',
	port: process.env.PORT ? Number(process.env.PORT) : 9001,
	prodFrontendUrl: process.env.PROD_FRONTEND_URL ?? 'http://localhost:5173',
};
