import { CreateMembershipPlanDto, UpdateMembershipPlanDto } from '#dto/membershipPlan.dto.js';
import * as membershipPlanService from '#services/membershipPlan.service.js';
import { Request, Response } from 'express';

/**
 * Create a new membership plan
 * @param req - Express request object containing membership plan data in body
 * @param res - Express response object
 * @returns JSON response with created membership plan (201) or error message (400)
 */
export const create = async (req: Request<object, object, CreateMembershipPlanDto>, res: Response) => {
	try {
		const membershipPlan = await membershipPlanService.createMembershipPlan(req.body);
		res.status(201).json(membershipPlan);
	} catch (error: unknown) {
		return res.status(400).json({ message: (error as Error).message });
	}
};

/**
 * Get all membership plans
 * @param _req - Express request object (not used)
 * @param res - Express response object
 * @returns JSON response with array of membership plans (200) or error message (500)
 */
export const getAll = async (_req: Request, res: Response) => {
	try {
		const membershipPlans = await membershipPlanService.getAllMembershipPlans();
		return res.json(membershipPlans);
	} catch (error: unknown) {
		return res.status(500).json({ message: (error as Error).message });
	}
};

/**
 * Get a membership plan by its ID
 * @param req - Express request object containing membership plan ID in params
 * @param res - Express response object
 * @returns JSON response with membership plan object (200) or error message (404/500)
 */
export const getById = async (req: Request<{ id: string }>, res: Response) => {
	try {
		const id = parseInt(req.params.id, 10);
		const membershipPlan = await membershipPlanService.getMembershipPlanById(id);
		if (!membershipPlan) {
			return res.status(404).json({ message: 'Membership plan not found' });
		}
		return res.json(membershipPlan);
	} catch (error: unknown) {
		return res.status(500).json({ message: (error as Error).message });
	}
};

/**
 * Update a membership plan by its ID
 * @param req - Express request object containing membership plan ID in params and update data in body
 * @param res - Express response object
 * @returns JSON response with updated membership plan object (200) or error message (400)
 */
export const updateById = async (req: Request<{ id: string }, object, UpdateMembershipPlanDto>, res: Response) => {
	try {
		const id = parseInt(req.params.id, 10);
		const membershipPlan = await membershipPlanService.updateMembershipPlanById(id, req.body);
		return res.json(membershipPlan);
	} catch (error: unknown) {
		return res.status(400).json({ message: (error as Error).message });
	}
};

/**
 * Delete a membership plan by its ID
 * @param req - Express request object containing membership plan ID in params
 * @param res - Express response object
 * @returns JSON response with deleted membership plan object (200) or error message (400)
 */
export const deleteById = async (req: Request<{ id: string }>, res: Response) => {
	try {
		const id = parseInt(req.params.id, 10);
		const membershipPlan = await membershipPlanService.deleteMembershipPlanById(id);
		return res.json(membershipPlan);
	} catch (error: unknown) {
		return res.status(400).json({ message: (error as Error).message });
	}
};
