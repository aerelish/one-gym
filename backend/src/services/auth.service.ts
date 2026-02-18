import { CreateUserDto } from '#dto/user.dto.js';
import { comparePassword, hashPassword } from '#lib/bcrypt.js';
import { prisma, Role } from '#lib/prisma.js';

export const registerUser = async (data: CreateUserDto) => {
	const { email, name, password, role } = data;

	if (!email || !name || !password) {
		throw new Error('Missing required fields');
	}

	const existingUser = await prisma.user.findUnique({ where: { email } });
	if (existingUser) {
		throw new Error('Email already exists');
	}

	const hashedPassword = await hashPassword(password);

	return prisma.user.create({
		data: {
			email,
			name,
			password: hashedPassword,
			role: role ?? Role.MEMBER,
		},
		select: {
			id: true,
			email: true,
			name: true,
			role: true,
			createdAt: true,
		},
	});
};

export const loginUser = async (email: string, password: string) => {
	const user = await prisma.user.findUnique({ where: { email } });

	if (!user) {
		throw new Error('Invalid email or password');
	}

	const isMatch = await comparePassword(password, user.password);
	if (!isMatch) {
		throw new Error('Invalid email or password');
	}

	// TODO - generate and return JWT token here after implementing JWT authentication
	return {
		id: user.id,
		email: user.email,
		name: user.name,
		role: user.role,
		createdAt: user.createdAt,
	};
};
