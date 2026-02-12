import { CreateMembershipPlanDto, UpdateMembershipPlanDto } from '#dto/membershipPlan.dto.js';
import { MembershipPlan, prisma } from '#lib/prisma.js';

/**
 * Create a new membership plan
 * @param data - data for new membership plan | using CreateMembershipPlanDto for type safety | description is optional defaults to empty string
 * @returns created MembershipPlan object or null if creation fails
 */
export const createMembershipPlan = async (data: CreateMembershipPlanDto): Promise<MembershipPlan | null> => {
	return prisma.membershipPlan.create({
		data: {
			description: data.description ?? '',
			duration: data.durationInDays,
			name: data.name,
			price: data.price,
		},
	});
};

/**
 * Get all membership plans
 * @returns array of all membership plans
 */
export const getAllMembershipPlans = async (): Promise<MembershipPlan[]> => {
	return prisma.membershipPlan.findMany();
};

/**
 * Get membership plan by its ID
 * @param id - membershipPlanId
 * @returns MembershipPlan object or null if not found
 */
export const getMembershipPlanById = async (id: number): Promise<MembershipPlan | null> => {
	return prisma.membershipPlan.findUnique({
		where: { id },
	});
};

/** * Update a membership plan by its ID
 * @param id - membershipPlanId
 * @param data - data to update | using UpdateMembershipPlanDto for type safety
 * @returns updated MembershipPlan object or null if not found
 */
export const updateMembershipPlanById = async (id: number, data: UpdateMembershipPlanDto): Promise<MembershipPlan | null> => {
	return prisma.membershipPlan.update({
		data,
		where: { id },
	});
};

/**
 * Delete a membership plan by its ID
 * @param id - membershipPlanId
 * @returns deleted MembershipPlan object
 */
export const deleteMembershipPlanById = async (id: number): Promise<MembershipPlan> => {
	return prisma.membershipPlan.delete({
		where: { id },
	});
};
