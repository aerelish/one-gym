import { ENV } from '#config/env.js';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaPg } from '@prisma/adapter-pg';
import { type MembershipPlan, PrismaClient, Role, type Subscription, SubscriptionStatus, type User } from '@prisma/client';

const nodeEnv = ENV.nodeEnv || 'development';
const connectionString: string = nodeEnv === 'production' ? ENV.databaseUrl : ENV.devDatabaseUrl;

let adapter: PrismaBetterSqlite3 | PrismaPg;
if (nodeEnv === 'production' && connectionString.startsWith('postgres://')) {
	adapter = new PrismaPg({ connectionString });
} else {
	adapter = new PrismaBetterSqlite3({ url: connectionString });
}

const prisma = new PrismaClient({ adapter });

export { type MembershipPlan, prisma, Role, type Subscription, SubscriptionStatus, type User };
