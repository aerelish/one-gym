import { CreateUserDto, UpdateUserDto } from '#dto/user.dto.js';
import { prisma, Role, User } from '#lib/prisma.js';

/**
 * create a new user
 * @param data - data for the new user | using CreateUserDto for type safety
 * @returns created User object
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
 *
 * @returns array of all users with their subscriptions and plans
 */
export const getAllUsers = async (): Promise<User[]> => {
	return prisma.user.findMany({
		include: {
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
 * @returns user object (along with their subscriptions and plans) or null if not found
 */
export const getUserById = async (id: number): Promise<null | User> => {
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
 * @returns user object or null if not found
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
export const updateUserById = async (id: number, data: UpdateUserDto): Promise<User> => {
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
export const deleteUserById = async (id: number): Promise<User> => {
	return prisma.user.delete({
		where: { id },
	});
};
