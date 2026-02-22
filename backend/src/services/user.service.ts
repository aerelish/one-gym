import { CreateUserDto, UpdateUserDto } from '#dto/user.dto.js';
import { prisma, Role, User } from '#lib/prisma.js';

/**
 * Create a new user
 * @param data - data for the new user | using CreateUserDto for type safety
 * @returns created User object
 *
 * !note - this function is not used in the auth service because we need to hash the password before creating the user. This function is used for admin functionality to create users without hashing the password (for testing purposes). The registerUser function in the auth service should be used for user registration as it handles password hashing.
 */
export const createUser = async (data: CreateUserDto): Promise<User> => {
	return prisma.user.create({
		data: {
			email: data.email,
			name: data.name,
			password: data.password,
			role: data.role ?? Role.MEMBER,
		},
	});
};

/**
 * Get all users with their subscriptions and plans
 * @returns array of all users with their subscriptions and plans
 */
export const getAllUsers = async (): Promise<Omit<User, 'password'>[]> => {
	return prisma.user.findMany({
		select: {
			id: true,
			email: true,
			name: true,
			role: true,
			createdAt: true,
			updatedAt: true,
			subscriptions: {
				include: {
					plan: true,
				},
			},
		},
	});
};

/**
 * Get a user by their ID
 * @param id - userId
 * @returns User object (along with their subscriptions and plans) or null if not found
 */
export const getUserById = async (id: string): Promise<null | User> => {
	return prisma.user.findUnique({
		include: {
			subscriptions: {
				include: {
					plan: true,
				},
			},
		},
		where: { id },
	});
};

/**
 * TODO - implement this after implementing basic CRUD operations for users. This will be used for login functionality.
 * get a user by their email
 * @param email - user's email
 * @returns User object or null if not found
 */
export const getUserByEmail = async (email: string): Promise<null | User> => {
	return prisma.user.findUnique({
		where: { email },
	});
};

/**
 * Update a user by their ID
 * @param id - userId
 * @param data - data to update | using UpdateUserDto for type safety
 * @returns updated User object
 */
export const updateUserById = async (id: string, data: UpdateUserDto): Promise<User> => {
	return prisma.user.update({
		data,
		where: { id },
	});
};

/**
 * Delete a user by their ID
 * @param id - userId
 * @returns deleted User object
 */
export const deleteUserById = async (id: string): Promise<User> => {
	return prisma.user.delete({
		where: { id },
	});
};
