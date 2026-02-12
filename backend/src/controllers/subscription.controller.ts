import { CreateSubscriptionDto, UpdateSubscriptionDto } from '#dto/subscription.dto.js';
import * as subscriptionService from '#services/subscription.service.js';
import { Request, Response } from 'express';

/**
 * Create a new subscription
 * @param req - Express request object containing subscription data in body
 * @param res - Express response object
 * @returns JSON response with created subscription (201) or error message (400)
 */
export const create = async (req: Request<object, object, CreateSubscriptionDto>, res: Response) => {
	try {
		const subscription = await subscriptionService.createSubscription(req.body);
		res.status(201).json(subscription);
	} catch (error: unknown) {
		return res.status(400).json({ message: (error as Error).message });
	}
};

/**
 * Get all subscriptions
 * @param _req - Express request object (not used)
 * @param res - Express response object
 * @returns JSON response with array of subscriptions (200) or error message (500)
 */
export const getAll = async (_req: Request, res: Response) => {
	try {
		const subscriptions = await subscriptionService.getAllSubscriptions();
		return res.json(subscriptions);
	} catch (error: unknown) {
		return res.status(500).json({ message: (error as Error).message });
	}
};

/**
 * Get a subscription by its ID
 * @param req - Express request object containing subscription ID in params
 * @param res - Express response object
 * @returns JSON response with subscription object (200) or error message (404/500)
 */
export const getById = async (req: Request<{ id: string }>, res: Response) => {
	try {
		const id = parseInt(req.params.id, 10);
		const subscription = await subscriptionService.getSubscriptionById(id);
		if (!subscription) {
			return res.status(404).json({ message: 'Subscription not found' });
		}
		return res.json(subscription);
	} catch (error: unknown) {
		return res.status(500).json({ message: (error as Error).message });
	}
};

/**
 * Update a subscription by its ID
 * @param req - Express request object containing subscription ID in params and update data in body
 * @param res - Express response object
 * @returns JSON response with updated subscription object (200) or error message (400)
 */
export const updateById = async (req: Request<{ id: string }, object, UpdateSubscriptionDto>, res: Response) => {
	try {
		const id = parseInt(req.params.id, 10);
		const subscription = await subscriptionService.updateSubscriptionById(id, req.body);
		return res.json(subscription);
	} catch (error: unknown) {
		return res.status(400).json({ message: (error as Error).message });
	}
};

/**
 * Delete a subscription by its ID
 * @param req - Express request object containing subscription ID in params
 * @param res - Express response object
 * @returns JSON response with deleted subscription object (200) or error message (400)
 */
export const deleteById = async (req: Request<{ id: string }>, res: Response) => {
	try {
		const id = parseInt(req.params.id, 10);
		const subscription = await subscriptionService.deleteSubscriptionById(id);
		return res.json(subscription);
	} catch (error: unknown) {
		return res.status(400).json({ message: (error as Error).message });
	}
};
