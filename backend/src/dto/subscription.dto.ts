import { SubscriptionStatus } from '#lib/prisma.js';

export interface CreateSubscriptionDto {
	endDate: Date;
	planId: number;
	startDate: Date;
	status?: SubscriptionStatus; // optional, defaults to 'ACTIVE'
	userId: number;
}

export interface UpdateSubscriptionDto {
	endDate?: Date;
	startDate?: Date;
	status?: SubscriptionStatus;
}
