import { createContext } from 'react';

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
	register: (payload: RegisterPayload) => void;
	login: (payload: LoginPayload) => Promise<void>;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
