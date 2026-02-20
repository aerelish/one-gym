import { createContext } from 'react';

export type RegisterPayload = {
	name: string;
	email: string;
	password: string;
};

export type User = {
	email: string;
	password: string;
};

interface AuthContextType {
	user: User | null;
	register: (payload: RegisterPayload) => void;
	login: (user: User) => Promise<void>;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
