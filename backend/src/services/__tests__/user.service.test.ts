import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { prisma, Role } from '#lib/prisma.js';
import { createUser, getAllUsers, getUserById, getUserByEmail, updateUserById, deleteUserById } from '../user.service.js';

jest.mock('#lib/prisma.js');

const mockPrisma = prisma as unknown as {
	user: {
		create: ReturnType<typeof jest.fn>;
		findMany: ReturnType<typeof jest.fn>;
		findUnique: ReturnType<typeof jest.fn>;
		update: ReturnType<typeof jest.fn>;
		delete: ReturnType<typeof jest.fn>;
	};
};

const mockUser = {
	id: 1,
	email: 'test@example.com',
	name: 'Test User',
	password: 'hashed_password',
	role: Role.MEMBER,
	createdAt: new Date(),
	updatedAt: new Date(),
};

const mockUserWithSubscriptions = {
	...mockUser,
	subscriptions: [
		{
			id: 1,
			userId: 1,
			planId: 1,
			startDate: new Date(),
			endDate: null,
			plan: { id: 1, name: 'Premium', price: 99.99 },
		},
	],
};

describe('UserService', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('createUser', () => {
		it('should create a user with provided data', async () => {
			mockPrisma.user.create.mockResolvedValue(mockUser);

			const result = await createUser({
				email: 'test@example.com',
				name: 'Test User',
				password: 'hashed_password',
				role: Role.MEMBER,
			});

			expect(mockPrisma.user.create).toHaveBeenCalledWith({
				data: {
					email: 'test@example.com',
					name: 'Test User',
					password: 'hashed_password',
					role: Role.MEMBER,
				},
			});
			expect(result).toEqual(mockUser);
		});

		it('should default role to MEMBER when not provided', async () => {
			mockPrisma.user.create.mockResolvedValue(mockUser);

			await createUser({
				email: 'test@example.com',
				name: 'Test User',
				password: 'hashed_password',
			});

			expect(mockPrisma.user.create).toHaveBeenCalledWith({
				data: expect.objectContaining({
					role: Role.MEMBER,
				}),
			});
		});
	});

	describe('getAllUsers', () => {
		it('should return all users with subscriptions and plans', async () => {
			const users = [mockUserWithSubscriptions];
			mockPrisma.user.findMany.mockResolvedValue(users);

			const result = await getAllUsers();

			expect(mockPrisma.user.findMany).toHaveBeenCalledWith({
				include: {
					subscriptions: {
						include: {
							plan: true,
						},
					},
				},
			});
			expect(result).toEqual(users);
		});

		it('should return empty array when no users exist', async () => {
			mockPrisma.user.findMany.mockResolvedValue([]);

			const result = await getAllUsers();

			expect(result).toEqual([]);
		});
	});

	describe('getUserById', () => {
		it('should return user with subscriptions and plans by id', async () => {
			mockPrisma.user.findUnique.mockResolvedValue(mockUserWithSubscriptions);

			const result = await getUserById(1);

			expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
				include: {
					subscriptions: {
						include: {
							plan: true,
						},
					},
				},
				where: { id: 1 },
			});
			expect(result).toEqual(mockUserWithSubscriptions);
		});

		it('should return null when user does not exist', async () => {
			mockPrisma.user.findUnique.mockResolvedValue(null);

			const result = await getUserById(999);

			expect(result).toBeNull();
		});
	});

	describe('getUserByEmail', () => {
		it('should return user by email', async () => {
			mockPrisma.user.findUnique.mockResolvedValue(mockUser);

			const result = await getUserByEmail('test@example.com');

			expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
				where: { email: 'test@example.com' },
			});
			expect(result).toEqual(mockUser);
		});

		it('should return null when user with email does not exist', async () => {
			mockPrisma.user.findUnique.mockResolvedValue(null);

			const result = await getUserByEmail('nonexistent@example.com');

			expect(result).toBeNull();
		});
	});

	describe('updateUserById', () => {
		it('should update user by id', async () => {
			const updatedUser = { ...mockUser, name: 'Updated Name' };
			mockPrisma.user.update.mockResolvedValue(updatedUser);

			const result = await updateUserById(1, { name: 'Updated Name' });

			expect(mockPrisma.user.update).toHaveBeenCalledWith({
				data: { name: 'Updated Name' },
				where: { id: 1 },
			});
			expect(result).toEqual(updatedUser);
		});

		it('should update multiple fields', async () => {
			const updatedUser = { ...mockUser, name: 'New Name', email: 'new@example.com' };
			mockPrisma.user.update.mockResolvedValue(updatedUser);

			await updateUserById(1, { name: 'New Name', email: 'new@example.com' });

			expect(mockPrisma.user.update).toHaveBeenCalledWith({
				data: { name: 'New Name', email: 'new@example.com' },
				where: { id: 1 },
			});
		});
	});

	describe('deleteUserById', () => {
		it('should delete user by id', async () => {
			mockPrisma.user.delete.mockResolvedValue(mockUser);

			const result = await deleteUserById(1);

			expect(mockPrisma.user.delete).toHaveBeenCalledWith({
				where: { id: 1 },
			});
			expect(result).toEqual(mockUser);
		});
	});
});
