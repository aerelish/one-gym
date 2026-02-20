import axios from 'axios';
import { ENV } from '@/config/_config';

const API_URL: string = ENV.nodeEnv === 'production' ? (ENV.apiBaseUrl ?? '') : (ENV.devApiBaseUrl ?? '');

const api = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

export const loginRequest = async (email: string, password: string) => {
	const response = await api.post('api/v1/auth/login', { email, password });
	return response.data;
};
