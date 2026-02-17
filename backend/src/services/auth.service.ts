import { CreateUserDto } from '#dto/user.dto.js';
import { hashPassword } from '#lib/bcrypt.js';
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
