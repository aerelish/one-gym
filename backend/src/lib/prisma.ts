import { ENV } from '#config/env.js';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

import { PrismaClient } from '../../generated/prisma/client.js';

const adapter = new PrismaBetterSqlite3({ url: ENV.databaseUrl });
const prisma = new PrismaClient({ adapter });

export { prisma };
