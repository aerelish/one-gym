import axios from 'axios';
import { ENV } from '@/config/_config';

const API_URL: string = ENV.nodeEnv === 'production' ? (ENV.apiBaseUrl ?? '') : (ENV.devApiBaseUrl ?? '');

export const api = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

export default api;
