export const ENV = {
	nodeEnv: import.meta.env.VITE_ENV ?? 'development',
	apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '',
	devApiBaseUrl: import.meta.env.VITE_DEV_API_BASE_URL ?? 'http://localhost:3000/api',
};
