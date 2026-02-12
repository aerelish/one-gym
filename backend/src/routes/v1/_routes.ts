/**
 * base route file to import all routes and export them as a single router
 */

import express from 'express';

import userRoutes from './user.routes.js';

const router = express.Router();

// add all routes here
router.use('/users', userRoutes);

export default router;
