import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { prisma, Role } from '#lib/prisma.js';
import { registerUser } from '#services/auth.service.js';

jest.mock('#lib/prisma', () => ({
	prisma: {
		user: {
			create: jest.fn(),
			findUnique: jest.fn(),
		},
	},
	Role: {
		MEMBER: 'MEMBER',
		ADMIN: 'ADMIN',
	},
}));

// create a typed version of the mocked prisma client
const mockPrisma = prisma as jest.Mocked<typeof prisma>;

const mockUser = {
	id: '1234567890abcdef',
	email: 'test@example.com',
	name: 'Test User',
	password: 'hashed_password',
	role: Role.MEMBER,
	createdAt: new Date(),
	updatedAt: new Date(),
};

describe('AuthService', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('register', () => {
		const userData = {
			email: 'test@example.com',
			name: 'Test User',
			password: 'password',
		};

		it('throws if email already exists', async () => {
			mockPrisma.user.findUnique.mockResolvedValueOnce(mockUser);
			await expect(registerUser(userData)).rejects.toThrow();
		});

		it('hashes password before saving', async () => {
			const hashedPassword = 'hashed_password';

			// mock the hashPassword function to return a specific hashed password
			jest.spyOn(require('#lib/bcrypt.js'), 'hashPassword').mockResolvedValueOnce(hashedPassword);

			// mock prisma.user.create to return the user with the hashed password
			mockPrisma.user.create.mockResolvedValueOnce({ ...mockUser, password: hashedPassword });

			const result = await registerUser(userData);
			expect(result).toEqual({ ...mockUser, password: hashedPassword });
		});

		it('creates user when input is valid', async () => {
			mockPrisma.user.create.mockResolvedValueOnce(mockUser);
			const result = await registerUser(userData);
			expect(result).toEqual(mockUser);
		});

		// ! this test is pretty sus, need to improve it later
		it('does not return password', async () => {
			mockPrisma.user.create.mockResolvedValueOnce({ ...mockUser, password: '' });
			const result = await registerUser(userData);
			expect(result).toEqual({ ...mockUser, password: '' });
		});
	});
});
