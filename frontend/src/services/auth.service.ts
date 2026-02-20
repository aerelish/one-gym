import axios from 'axios';
import { ENV } from '@/config/_config';

const API_URL: string = ENV.nodeEnv === 'production' ? (ENV.apiBaseUrl ?? '') : (ENV.devApiBaseUrl ?? '');

const api = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

// TODO: Work / Study on axis Error Handling
export const login = async (email: string, password: string) => {
	try {
		const response = await api.post('api/v1/auth/login', { email, password });
		return response.data;
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			const message = error.response?.data?.message;
			// console.error('Login Failed:', message || error.message);
			throw new Error(typeof message === 'string' ? message : 'Login Failed: Unknown AxiosError');
		}
		if (error instanceof Error) {
			// console.error('Login Failed:', error.message);
			throw error;
		}
		// console.error('Login Failed: Unknown error');
		throw new Error('Login Failed: Unknown Error');
	}
};
