import { CreateSubscriptionDto, UpdateSubscriptionDto } from '#dto/subscription.dto.js';
import { prisma, Subscription, SubscriptionStatus } from '#lib/prisma.js';

/**
 * Create a new subscription
 * @param data - data for the new subscription | using CreateSubscriptionDto for type safety
 * @returns created Subscription object
 */
export const createSubscription = async (data: CreateSubscriptionDto): Promise<Subscription> => {
	return prisma.subscription.create({
		data: {
			endDate: data.endDate,
			planId: data.planId,
			startDate: data.startDate,
			status: data.status ?? SubscriptionStatus.ACTIVE,
			userId: data.userId,
		},
	});
};

/**
 * Get all subscriptions with their users and plans
 * @returns array of all subscriptions with their users and plans
 */
export const getAllSubscriptions = async (): Promise<Subscription[]> => {
	return prisma.subscription.findMany({
		include: {
			plan: true,
			user: true,
		},
	});
};

/**
 * Get a subscription by its ID
 * @param id - subscriptionId
 * @returns Subscription object (along with user and plan) or null if not found
 */
export const getSubscriptionById = async (id: number): Promise<null | Subscription> => {
	return prisma.subscription.findUnique({
		include: {
			plan: true,
			user: true,
		},
		where: { id },
	});
};

/**
 * Update a subscription by its ID
 * @param id - subscriptionId
 * @param data - data to update | using UpdateSubscriptionDto for type safety
 * @returns updated Subscription object
 */
export const updateSubscriptionById = async (id: number, data: UpdateSubscriptionDto): Promise<Subscription> => {
	return prisma.subscription.update({
		data,
		where: { id },
	});
};

/**
 * Delete a subscription by its ID
 * @param id - subscriptionId
 * @returns deleted Subscription object
 */
export const deleteSubscriptionById = async (id: number): Promise<Subscription> => {
	return prisma.subscription.delete({
		where: { id },
	});
};
