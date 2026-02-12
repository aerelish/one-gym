import { Role } from '#lib/prisma.js';

export interface CreateUserDto {
	email: string;
	name: string;
	password: string;
	role?: Role; // optional, defaults to 'MEMBER'
}

export interface UpdateUserDto {
	email?: string;
	name?: string;
	password?: string;
	role?: Role;
}
