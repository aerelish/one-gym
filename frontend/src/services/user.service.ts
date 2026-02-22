import api from '@/lib/api';

export const fetchUsers = async () => {
	const response = await api.get('api/v1/users');
	return response.data;
};

export const fetchUserById = async (id: string) => {
	const response = await api.get(`api/v1/users/${id}`);
	return response.data;
};
