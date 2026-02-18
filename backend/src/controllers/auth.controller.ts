import { CreateUserDto } from '#dto/user.dto.js';
import * as authService from '#services/auth.service.js';
import { Request, Response } from 'express';

export const register = async (req: Request<object, object, CreateUserDto>, res: Response) => {
	try {
		const user = await authService.registerUser(req.body);
		res.status(201).json(user);
	} catch (error: unknown) {
		return res.status(400).json({ message: (error as Error).message });
	}
};
