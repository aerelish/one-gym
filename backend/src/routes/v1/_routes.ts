/**
 ** base route file to import all routes and export them as a single router
 */

import express from 'express';

import authRoutes from './auth.routes.js';
import membershipPlanRoutes from './membershipPlan.routes.js';
import subscriptionRoutes from './subscription.routes.js';
import userRoutes from './user.routes.js';

const router = express.Router();

/**
 ** routes go here, all routes in this file are prefixed with /api/v1
 */

// unprotected routes
router.use('/auth', authRoutes);

// protected routes
router.use('/users', userRoutes);
router.use('/membership-plans', membershipPlanRoutes);
router.use('/subscriptions', subscriptionRoutes);

export default router;
