import { ENV } from '#config/env.js';
import { defineConfig } from 'prisma/config';

export default defineConfig({
	datasource: {
		url: ENV.nodeEnv === 'production' ? ENV.databaseUrl : ENV.devDatabaseUrl,
	},
	migrations: {
		path: 'prisma/migrations',
	},
	schema: 'prisma/schema.prisma',
});
