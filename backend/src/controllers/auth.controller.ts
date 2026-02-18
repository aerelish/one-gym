import { CreateUserDto } from '#dto/user.dto.js';
import * as authService from '#services/auth.service.js';
import { Request, Response } from 'express';

export const register = async (req: Request<object, object, CreateUserDto>, res: Response) => {
	try {
		const { email, name, password } = req.body;

		if (!email || !name || !password) {
			return res.status(400).json({ message: 'email, name, and password are required' });
		}

		const user = await authService.registerUser(req.body);
		res.status(201).json(user);
	} catch (error: unknown) {
		return res.status(400).json({ message: (error as Error).message });
	}
};

export const login = async (req: Request<object, object, { email: string; password: string }>, res: Response) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ message: 'email and password are required' });
	}

	try {
		const result = await authService.loginUser(email, password);
		res.status(200).json(result);
	} catch (error: unknown) {
		return res.status(400).json({ message: (error as Error).message });
	}
};
