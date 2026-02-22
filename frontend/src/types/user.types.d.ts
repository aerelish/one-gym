import type { Subscription } from './subscription.types';

export interface User {
	id: string;
	email: string;
	name: string;
	role?: 'MEMBER' | 'ADMIN';
	createdAt: string;
	updatedAt: string;
	subscriptions?: Subscription[];
}
