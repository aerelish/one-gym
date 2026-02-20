import { createContext } from 'react';
import type { User } from '@/types/user.types';

export type RegisterPayload = {
	name: string;
	email: string;
	password: string;
	role?: 'MEMBER' | 'ADMIN';
};

export type LoginPayload = {
	email: string;
	password: string;
};

interface AuthContextType {
	user: User | null;
	register: (payload: RegisterPayload) => void;
	login: (payload: LoginPayload) => Promise<void>;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
