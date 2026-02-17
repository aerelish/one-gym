import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { prisma, Role } from '#lib/prisma.js';
import { createUser, getAllUsers, getUserById, getUserByEmail, updateUserById, deleteUserById } from '#services/user.service.js';

// mock the prisma client and the Role enum
jest.mock('#lib/prisma', () => ({
	prisma: {
		user: {
			create: jest.fn(),
			findMany: jest.fn(),
			findUnique: jest.fn(),
			update: jest.fn(),
			delete: jest.fn(),
		},
	},
	Role: {
		MEMBER: 'MEMBER',
		ADMIN: 'ADMIN',
	},
}));

// create a typed version of the mocked prisma client
const mockPrisma = prisma as jest.Mocked<typeof prisma>;

// mock user data
const mockUser = {
	id: 1,
	email: 'test@example.com',
	name: 'Test User',
	password: 'hashed_password',
	role: Role.MEMBER,
	createdAt: new Date(),
	updatedAt: new Date(),
};

// mock user with subscriptions and plans
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

			// check that prisma.user.create was called with the correct data
			expect(mockPrisma.user.create).toHaveBeenCalledWith({
				data: {
					email: 'test@example.com',
					name: 'Test User',
					password: 'hashed_password',
					role: Role.MEMBER,
				},
			});

			// check that the result is the mockUser
			expect(result).toEqual(mockUser);
		});

		it('should default role to MEMBER when not provided', async () => {
			mockPrisma.user.create.mockResolvedValue(mockUser);

			// call createUser without role
			await createUser({
				email: 'test@example.com',
				name: 'Test User',
				password: 'hashed_password',
			});

			// check that prisma.user.create was called with role set to MEMBER
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

			// call getAllUsers
			const result = await getAllUsers();

			// check that prisma.user.findMany was called with subscriptions and plans included
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
			// check that the result is an empty array
			expect(result).toEqual([]);
		});
	});

	describe('getUserById', () => {
		it('should return user with subscriptions and plans by id', async () => {
			mockPrisma.user.findUnique.mockResolvedValue(mockUserWithSubscriptions);

			const result = await getUserById(1);

			// check that prisma.user.findUnique was called with the correct id and included subscriptions and plans
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

			// check that the result is the mockUserWithSubscriptions
			expect(result).toEqual(mockUserWithSubscriptions);
		});

		it('should return null when user does not exist', async () => {
			mockPrisma.user.findUnique.mockResolvedValue(null);

			const result = await getUserById(999);
			// check that the result is null when user does not exist
			expect(result).toBeNull();
		});
	});

	/**
	 * TODO - implement this after implementing basic CRUD operations for users. This will be used for login functionality.
	 */
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
			// check that the result is null when user with email does not exist
			expect(result).toBeNull();
		});
	});

	describe('updateUserById', () => {
		it('should update user by id', async () => {
			const updatedData = { name: 'Updated Name' };
			const updatedUser = { ...mockUser, ...updatedData };

			mockPrisma.user.update.mockResolvedValue(updatedUser);

			// call updateUserById with new name
			const result = await updateUserById(1, updatedData);

			// check that prisma.user.update was called with the correct id and data
			expect(mockPrisma.user.update).toHaveBeenCalledWith({
				data: updatedData,
				where: { id: 1 },
			});

			// check that the result is the updated user
			expect(result).toEqual(updatedUser);
		});

		it('should update multiple fields', async () => {
			const updateData = { name: 'New Name', email: 'new@example.com' };
			const updatedUser = { ...mockUser, ...updateData };

			mockPrisma.user.update.mockResolvedValue(updatedUser);

			// call updateUserById with new name and email
			await updateUserById(1, updateData);

			// check that prisma.user.update was called with the correct id and data
			expect(mockPrisma.user.update).toHaveBeenCalledWith({
				data: updateData,
				where: { id: 1 },
			});
		});
	});

	describe('deleteUserById', () => {
		it('should delete user by id', async () => {
			mockPrisma.user.delete.mockResolvedValue(mockUser);

			const result = await deleteUserById(1);

			// check that prisma.user.delete was called with the correct id
			expect(mockPrisma.user.delete).toHaveBeenCalledWith({
				where: { id: 1 },
			});

			// check that the result is the deleted user
			expect(result).toEqual(mockUser);
		});
	});
});
