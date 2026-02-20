import axios from 'axios';
import { ENV } from '@/config/_config';
import { type LoginPayload, type RegisterPayload } from '@/context/auth/auth.context';

const API_URL: string = ENV.nodeEnv === 'production' ? (ENV.apiBaseUrl ?? '') : (ENV.devApiBaseUrl ?? '');

const api = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

export const registerRequest = async (payload: RegisterPayload) => {
	const response = await api.post('api/v1/auth/register', payload);
	return response.data;
};

export const loginRequest = async (payload: LoginPayload) => {
	const response = await api.post('api/v1/auth/login', payload);
	return response.data;
};
