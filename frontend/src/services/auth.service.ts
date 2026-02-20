import axios from 'axios';
import { ENV } from '@/config/_config';

const API_URL = ENV.nodeEnv === 'production' ? ENV.apiBaseUrl : ENV.devApiBaseUrl;

const api = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

export const login = async (email: string, password: string) => {
	try {
		const response = await api.post('/v1/auth/login', { email, password }, { withCredentials: true });
		return response.data;
	} catch (error) {
		console.error('Login error:', error);
		throw error;
	}
};
