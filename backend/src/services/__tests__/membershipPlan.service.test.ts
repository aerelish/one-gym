import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { prisma } from '#lib/prisma.js';
import {
	createMembershipPlan,
	getAllMembershipPlans,
	getMembershipPlanById,
	updateMembershipPlanById,
	deleteMembershipPlanById,
} from '#services/membershipPlan.service.js';

// mock the prisma client
jest.mock('#lib/prisma', () => ({
	prisma: {
		membershipPlan: {
			create: jest.fn(),
			findMany: jest.fn(),
			findUnique: jest.fn(),
			update: jest.fn(),
			delete: jest.fn(),
		},
	},
}));

// create a typed version of the mocked prisma client
const mockPrisma = prisma as jest.Mocked<typeof prisma>;

// mock membership plan data
const mockMembershipPlan = {
	id: 1,
	name: 'Gold Plan',
	description: 'Access to all gym facilities and premium classes.',
	duration: 30,
	price: 1499,
	createdAt: new Date(),
	updatedAt: new Date(),
};

describe('MembershipPlanService', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('createMembershipPlan', () => {
		it('should create a membership plan with provided data', async () => {
			mockPrisma.membershipPlan.create.mockResolvedValue(mockMembershipPlan);

			const result = await createMembershipPlan({
				description: 'Access to all gym facilities and premium classes.',
				durationInDays: 30,
				name: 'Gold Plan',
				price: 1499,
			});

			// check that prisma.membershipPlan.create was called with mapped duration field
			expect(mockPrisma.membershipPlan.create).toHaveBeenCalledWith({
				data: {
					description: 'Access to all gym facilities and premium classes.',
					duration: 30,
					name: 'Gold Plan',
					price: 1499,
				},
			});

			// check that the result is the created membership plan
			expect(result).toEqual(mockMembershipPlan);
		});

		it('should default description to empty string when not provided', async () => {
			mockPrisma.membershipPlan.create.mockResolvedValue({
				...mockMembershipPlan,
				description: '',
			});

			await createMembershipPlan({
				durationInDays: 30,
				name: 'Gold Plan',
				price: 1499,
			});

			// check that prisma.membershipPlan.create was called with empty description
			expect(mockPrisma.membershipPlan.create).toHaveBeenCalledWith({
				data: expect.objectContaining({
					description: '',
				}),
			});
		});

		it('should propagate errors when create fails', async () => {
			const dbError = new Error('Database create failure');
			mockPrisma.membershipPlan.create.mockRejectedValue(dbError);

			await expect(
				createMembershipPlan({
					description: 'Starter plan',
					durationInDays: 15,
					name: 'Starter',
					price: 799,
				}),
			).rejects.toThrow('Database create failure');
		});
	});

	describe('getAllMembershipPlans', () => {
		it('should return all membership plans', async () => {
			const plans = [
				mockMembershipPlan,
				{
					...mockMembershipPlan,
					id: 2,
					name: 'Basic Plan',
					duration: 7,
					price: 499,
				},
			];
			mockPrisma.membershipPlan.findMany.mockResolvedValue(plans);

			const result = await getAllMembershipPlans();

			// check that prisma.membershipPlan.findMany was called without filters
			expect(mockPrisma.membershipPlan.findMany).toHaveBeenCalledWith();
			expect(result).toEqual(plans);
		});

		it('should return empty array when no membership plans exist', async () => {
			mockPrisma.membershipPlan.findMany.mockResolvedValue([]);

			const result = await getAllMembershipPlans();
			expect(result).toEqual([]);
		});

		it('should propagate errors when findMany fails', async () => {
			const dbError = new Error('Database findMany failure');
			mockPrisma.membershipPlan.findMany.mockRejectedValue(dbError);

			await expect(getAllMembershipPlans()).rejects.toThrow('Database findMany failure');
		});
	});

	describe('getMembershipPlanById', () => {
		it('should return membership plan by id', async () => {
			mockPrisma.membershipPlan.findUnique.mockResolvedValue(mockMembershipPlan);

			const result = await getMembershipPlanById(1);

			// check that prisma.membershipPlan.findUnique was called with the correct id
			expect(mockPrisma.membershipPlan.findUnique).toHaveBeenCalledWith({
				where: { id: 1 },
			});
			expect(result).toEqual(mockMembershipPlan);
		});

		it('should return null when membership plan does not exist', async () => {
			mockPrisma.membershipPlan.findUnique.mockResolvedValue(null);

			const result = await getMembershipPlanById(999);
			expect(result).toBeNull();
		});

		it('should propagate errors when findUnique fails', async () => {
			const dbError = new Error('Database findUnique failure');
			mockPrisma.membershipPlan.findUnique.mockRejectedValue(dbError);

			await expect(getMembershipPlanById(1)).rejects.toThrow('Database findUnique failure');
		});
	});

	describe('updateMembershipPlanById', () => {
		it('should update membership plan by id', async () => {
			const updateData = { name: 'Gold Plus Plan' };
			const updatedPlan = { ...mockMembershipPlan, ...updateData };

			mockPrisma.membershipPlan.update.mockResolvedValue(updatedPlan);

			const result = await updateMembershipPlanById(1, updateData);

			// check that prisma.membershipPlan.update was called with the correct id and data
			expect(mockPrisma.membershipPlan.update).toHaveBeenCalledWith({
				data: updateData,
				where: { id: 1 },
			});
			expect(result).toEqual(updatedPlan);
		});

		it('should update multiple fields', async () => {
			const updateData = {
				description: 'Extended access plus nutrition guidance.',
				durationInDays: 60,
				price: 2499,
			};

			mockPrisma.membershipPlan.update.mockResolvedValue({
				...mockMembershipPlan,
				description: updateData.description,
				duration: 60,
				price: updateData.price,
			});

			await updateMembershipPlanById(1, updateData);

			// check that service forwards the update payload
			expect(mockPrisma.membershipPlan.update).toHaveBeenCalledWith({
				data: updateData,
				where: { id: 1 },
			});
		});

		it('should propagate errors when update fails', async () => {
			const dbError = new Error('Database update failure');
			mockPrisma.membershipPlan.update.mockRejectedValue(dbError);

			await expect(updateMembershipPlanById(1, { price: 1599 })).rejects.toThrow('Database update failure');
		});
	});

	describe('deleteMembershipPlanById', () => {
		it('should delete membership plan by id', async () => {
			mockPrisma.membershipPlan.delete.mockResolvedValue(mockMembershipPlan);

			const result = await deleteMembershipPlanById(1);

			// check that prisma.membershipPlan.delete was called with the correct id
			expect(mockPrisma.membershipPlan.delete).toHaveBeenCalledWith({
				where: { id: 1 },
			});
			expect(result).toEqual(mockMembershipPlan);
		});

		it('should propagate errors when delete fails', async () => {
			const dbError = new Error('Database delete failure');
			mockPrisma.membershipPlan.delete.mockRejectedValue(dbError);

			await expect(deleteMembershipPlanById(1)).rejects.toThrow('Database delete failure');
		});
	});
});
