import { createContext } from 'react';

export type User = {
	email: string;
	password: string;
};

export type AuthContextType = {
	user: User | null;
	register: (name: string, email: string, password: string) => void;
	login: (user: User) => void;
	logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);
