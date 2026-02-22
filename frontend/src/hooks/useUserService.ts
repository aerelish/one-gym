import { useState, useCallback, useEffect } from 'react';
import { fetchUsers as fetchUsersService } from '@/services/user.service';
import type { User } from '@/types/user.types';

export type UsersMapped = {
	name: string;
	email: string;
	active: boolean;
	createdAt: string;
};

interface UseUserServiceReturn {
	users: User[];
	usersMapped: UsersMapped[];
	user: User | null;
	loading: boolean;
	error: Error | null;
	fetchAllUsers: () => Promise<void>;
	fetchUser: (id: string) => Promise<void>;
	updateUser: (id: string, data: Partial<User>) => Promise<void>;
	deleteUser: (id: string) => Promise<void>;
	clearError: () => void;
}

export const useUserService = (): UseUserServiceReturn => {
	const [users, setUsers] = useState<User[]>([]);
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const fetchAllUsers = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const users = await fetchUsersService();
			setUsers(users);
		} catch (err) {
			setError(err instanceof Error ? err : new Error('Unknown error'));
		} finally {
			setLoading(false);
		}
	}, []);

	const fetchUser = useCallback(async (id: string) => {
		setLoading(true);
		setError(null);
		try {
			// Replace with your actual user.service call
			const response = await fetch(`/api/users/${id}`);
			if (!response.ok) throw new Error('Failed to fetch user');
			const data = await response.json();
			setUser(data);
		} catch (err) {
			setError(err instanceof Error ? err : new Error('Unknown error'));
		} finally {
			setLoading(false);
		}
	}, []);

	const updateUser = useCallback(async (id: string, data: Partial<User>) => {
		setLoading(true);
		setError(null);
		try {
			const response = await fetch(`/api/users/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			});
			if (!response.ok) throw new Error('Failed to update user');
			const updated = await response.json();
			setUser(updated);
		} catch (err) {
			setError(err instanceof Error ? err : new Error('Unknown error'));
		} finally {
			setLoading(false);
		}
	}, []);

	const deleteUser = useCallback(async (id: string) => {
		setLoading(true);
		setError(null);
		try {
			const response = await fetch(`/api/users/${id}`, { method: 'DELETE' });
			if (!response.ok) throw new Error('Failed to delete user');
			setUser(null);
		} catch (err) {
			setError(err instanceof Error ? err : new Error('Unknown error'));
		} finally {
			setLoading(false);
		}
	}, []);

	const clearError = useCallback(() => setError(null), []);

	useEffect(() => {
		fetchAllUsers();
	}, [fetchAllUsers]);

	const usersMapped = users.map((u) => ({
		name: u.name,
		email: u.email,
		active: !!u.subscriptions,
		createdAt: u.createdAt,
	}));

	return {
		users,
		usersMapped,
		user,
		loading,
		error,
		fetchAllUsers,
		fetchUser,
		updateUser,
		deleteUser,
		clearError,
	};
};
