import { hashPassword } from '#lib/bcrypt.js';
import { Role, type User } from '@prisma/client'; // prisma-generated types

export async function mockUser(overrides: Partial<User> = {}): Promise<User> {
	const password = overrides.password ?? 'password123';
	const hashedPassword = await hashPassword(password);

	return {
		id: overrides.id ?? 'uuid-123', // UUID string, easy to update if schema changes
		name: overrides.name ?? 'Test User',
		email: overrides.email ?? `test_${String(Date.now())}@example.com`,
		password: hashedPassword,
		role: overrides.role ?? Role.MEMBER,
		createdAt: overrides.createdAt ?? new Date(),
		updatedAt: overrides.updatedAt ?? new Date(),
	};
}
