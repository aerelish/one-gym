/**
 * these are the .env variables,
 * just getting them from process.env and providing defaults if they are not set
 * this makes it easier as well, just do ENV instead of process.env
 */

export const ENV = {
	databaseUrl: process.env.DATABASE_URL ?? 'file:./dev.db',
	devDatabaseUrl: process.env.DEV_DATABASE_URL ?? 'file:./dev.db',
	devFrontendUrl: process.env.DEV_FRONTEND_URL ?? 'http://localhost:5173',
	frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:5173',
	nodeEnv: process.env.NODE_ENV ?? 'development',
	port: process.env.PORT ? Number(process.env.PORT) : 9001,
};
