import { ENV } from '#config/env.js';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

// important! need to import types from generated prisma client
import { type MembershipPlan, PrismaClient, type Subscription, type User } from '../../generated/prisma/client.js';
import { Role, SubscriptionStatus } from '../../generated/prisma/enums.js';

const databaseUrl = ENV.nodeEnv === 'production' ? ENV.databaseUrl : ENV.devDatabaseUrl;

const adapter = new PrismaBetterSqlite3({ url: databaseUrl });
const prisma = new PrismaClient({ adapter });

export { type MembershipPlan, prisma, Role, type Subscription, SubscriptionStatus, type User };
