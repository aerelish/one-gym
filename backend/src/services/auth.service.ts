import { CreateUserDto } from '#dto/user.dto.js';
import { comparePassword, hashPassword } from '#lib/bcrypt.js';
import { signToken } from '#lib/jwt.js';
import { prisma, Role } from '#lib/prisma.js';

export const registerUser = async (data: CreateUserDto) => {
	const { email, name, password, role } = data;

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

	// generate and return JWT token
	const token = signToken({ email: user.email });
	return { token };
};
