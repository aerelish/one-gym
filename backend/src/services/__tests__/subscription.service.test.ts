import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { prisma, SubscriptionStatus } from '#lib/prisma.js';
import {
	createSubscription,
	getAllSubscriptions,
	getSubscriptionById,
	updateSubscriptionById,
	deleteSubscriptionById,
} from '#services/subscription.service.js';

// mock the prisma client and the SubscriptionStatus enum
jest.mock('#lib/prisma', () => ({
	prisma: {
		subscription: {
			create: jest.fn(),
			findMany: jest.fn(),
			findUnique: jest.fn(),
			update: jest.fn(),
			delete: jest.fn(),
		},
	},
	SubscriptionStatus: {
		ACTIVE: 'ACTIVE',
		CANCELLED: 'CANCELLED',
		EXPIRED: 'EXPIRED',
	},
}));

// create a typed version of the mocked prisma client
const mockPrisma = prisma as jest.Mocked<typeof prisma>;

// mock subscription data
const mockSubscription = {
	id: 1,
	userId: '1234567890abcdef',
	planId: 1,
	status: SubscriptionStatus.ACTIVE,
	startDate: new Date('2026-01-01'),
	endDate: new Date('2026-12-31'),
	createdAt: new Date(),
	updatedAt: new Date(),
};

// mock subscription with user and plan
const mockSubscriptionWithUserAndPlan = {
	...mockSubscription,
	user: {
		id: 1,
		email: 'user@example.com',
	},
	plan: {
		id: 1,
		name: 'Basic Plan',
	},
};

describe('SubscriptionService', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('createSubscription', () => {
		it('should create a new subscription', async () => {
			mockPrisma.subscription.create.mockResolvedValue(mockSubscription);

			const result = await createSubscription({
				userId: '1234567890abcdef',
				planId: 1,
				startDate: new Date('2026-01-01'),
				endDate: new Date('2026-12-31'),
				status: SubscriptionStatus.ACTIVE,
			});

			// check that prisma.subscription.create was called with the correct data
			expect(mockPrisma.subscription.create).toHaveBeenCalledWith({
				data: {
					userId: '1234567890abcdef',
					planId: 1,
					startDate: new Date('2026-01-01'),
					endDate: new Date('2026-12-31'),
					status: SubscriptionStatus.ACTIVE,
				},
			});

			// check that the result is the mockSubscription
			expect(result).toEqual(mockSubscription);
		});

		it('should default status to ACTIVE if not provided', async () => {
			mockPrisma.subscription.create.mockResolvedValue(mockSubscription);

			// call createSubscription without status
			await createSubscription({
				userId: '1234567890abcdef',
				planId: 1,
				startDate: new Date('2026-01-01'),
				endDate: new Date('2026-12-31'),
			});

			// check that prisma.subscription.create was called with status set to ACTIVE
			expect(mockPrisma.subscription.create).toHaveBeenCalledWith({
				data: expect.objectContaining({
					status: SubscriptionStatus.ACTIVE,
				}),
			});
		});
	});

	describe('getAllSubscriptions', () => {
		it('should return all subscriptions with users and plans', async () => {
			const subscriptions = [mockSubscriptionWithUserAndPlan];
			mockPrisma.subscription.findMany.mockResolvedValue(subscriptions);

			// call getAllSubscriptions
			const result = await getAllSubscriptions();

			// check that prisma.subscription.findMany was called with user and plan included
			expect(mockPrisma.subscription.findMany).toHaveBeenCalledWith({
				include: {
					plan: true,
					user: true,
				},
			});
			expect(result).toEqual(subscriptions);
		});

		it('should return empty array when no subscriptions exist', async () => {
			mockPrisma.subscription.findMany.mockResolvedValue([]);

			const result = await getAllSubscriptions();
			// check that the result is an empty array
			expect(result).toEqual([]);
		});
	});

	describe('getSubscriptionById', () => {
		it('should return subscription with user and plan by id', async () => {
			mockPrisma.subscription.findUnique.mockResolvedValue(mockSubscriptionWithUserAndPlan);

			const result = await getSubscriptionById(1);

			// check that prisma.subscription.findUnique was called with the correct id and included user and plan
			expect(mockPrisma.subscription.findUnique).toHaveBeenCalledWith({
				include: {
					plan: true,
					user: true,
				},
				where: { id: 1 },
			});

			// check that the result is the mockSubscriptionWithUserAndPlan
			expect(result).toEqual(mockSubscriptionWithUserAndPlan);
		});

		it('should return null when subscription does not exist', async () => {
			mockPrisma.subscription.findUnique.mockResolvedValue(null);

			const result = await getSubscriptionById(999);
			// check that the result is null when subscription does not exist
			expect(result).toBeNull();
		});
	});

	describe('updateSubscriptionById', () => {
		it('should update subscription by id', async () => {
			const updatedData = { status: SubscriptionStatus.CANCELLED };
			const updatedSubscription = { ...mockSubscription, ...updatedData };

			mockPrisma.subscription.update.mockResolvedValue(updatedSubscription);

			// call updateSubscriptionById with a new status
			const result = await updateSubscriptionById(1, updatedData);

			// check that prisma.subscription.update was called with the correct id and data
			expect(mockPrisma.subscription.update).toHaveBeenCalledWith({
				data: updatedData,
				where: { id: 1 },
			});

			// check that the result is the updated subscription
			expect(result).toEqual(updatedSubscription);
		});

		it('should update multiple fields', async () => {
			const updatedEndDate = new Date('2026-06-30');
			const updateData = {
				status: SubscriptionStatus.EXPIRED,
				endDate: updatedEndDate,
			};

			const updatedSubscription = { ...mockSubscription, ...updateData };
			mockPrisma.subscription.update.mockResolvedValue(updatedSubscription);

			// call updateSubscriptionById with new status and endDate
			await updateSubscriptionById(1, updateData);

			// check that prisma.subscription.update was called with the correct id and data
			expect(mockPrisma.subscription.update).toHaveBeenCalledWith({
				data: updateData,
				where: { id: 1 },
			});
		});
	});

	describe('deleteSubscriptionById', () => {
		it('should delete subscription by id', async () => {
			mockPrisma.subscription.delete.mockResolvedValue(mockSubscription);

			const result = await deleteSubscriptionById(1);

			// check that prisma.subscription.delete was called with the correct id
			expect(mockPrisma.subscription.delete).toHaveBeenCalledWith({
				where: { id: 1 },
			});

			// check that the result is the deleted subscription
			expect(result).toEqual(mockSubscription);
		});
	});
});
