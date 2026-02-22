import api from '@/lib/api';
import { type LoginPayload, type RegisterPayload } from '@/context/auth/auth.context';

export const registerRequest = async (payload: RegisterPayload) => {
	const response = await api.post('api/v1/auth/register', payload);
	return response.data;
};

export const loginRequest = async (payload: LoginPayload) => {
	const response = await api.post('api/v1/auth/login', payload);
	return response.data;
};
