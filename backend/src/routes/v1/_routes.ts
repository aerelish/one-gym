/**
 * base route file to import all routes and export them as a single router
 */

import express from 'express';

import membershipPlanRoutes from './membershipPlan.routes.js';
import subscriptionRoutes from './subscription.routes.js';
import userRoutes from './user.routes.js';

const router = express.Router();

// add all routes here
router.use('/users', userRoutes);
router.use('/membership-plans', membershipPlanRoutes);
router.use('/subscriptions', subscriptionRoutes);

export default router;
