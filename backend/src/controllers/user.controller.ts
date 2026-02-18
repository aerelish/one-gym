import { CreateUserDto, UpdateUserDto } from '#dto/user.dto.js';
import * as userService from '#services/user.service.js';
import { Request, Response } from 'express';

/**
 * Create a new user
 * @param req - Express request object containing user data in body
 * @param res - Express response object
 * @returns JSON response with created user (201) or error message (400)
 */
export const create = async (req: Request<object, object, CreateUserDto>, res: Response) => {
	try {
		const user = await userService.createUser(req.body);
		res.status(201).json(user);
	} catch (error: unknown) {
		return res.status(400).json({ message: (error as Error).message });
	}
};

/**
 * Get all users
 * @param _req - Express request object (not used)
 * @param res - Express response object
 * @returns JSON response with array of users (200) or error message (500)
 */
export const getAll = async (_req: Request, res: Response) => {
	try {
		const users = await userService.getAllUsers();
		return res.json(users);
	} catch (error: unknown) {
		return res.status(500).json({ message: (error as Error).message });
	}
};

/**
 * Get a user by their ID
 * @param req - Express request object containing user ID in params
 * @param res - Express response object
 * @returns JSON response with user object (200) or error message (404/500)
 */
export const getById = async (req: Request<{ id: string }>, res: Response) => {
	try {
		const { id } = req.params;
		const user = await userService.getUserById(id);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		return res.json(user);
	} catch (error: unknown) {
		return res.status(500).json({ message: (error as Error).message });
	}
};

/**
 * Update a user by their ID
 * @param req - Express request object containing user ID in params and update data in body
 * @param res - Express response object
 * @returns JSON response with updated user object (200) or error message (400)
 */
export const updateById = async (req: Request<{ id: string }, object, UpdateUserDto>, res: Response) => {
	try {
		const { id } = req.params;
		const user = await userService.updateUserById(id, req.body);
		return res.json(user);
	} catch (error: unknown) {
		return res.status(400).json({ message: (error as Error).message });
	}
};

/**
 * Delete a user by their ID
 * @param req - Express request object containing user ID in params
 * @param res - Express response object
 * @returns JSON response with deleted user object (200) or error message (400)
 */
export const deleteById = async (req: Request<{ id: string }>, res: Response) => {
	try {
		const { id } = req.params;
		const user = await userService.deleteUserById(id);
		return res.json(user);
	} catch (error: unknown) {
		return res.status(400).json({ message: (error as Error).message });
	}
};
