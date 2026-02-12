import { create, deleteById, getAll, getById, updateById } from '#controllers/membershipPlan.controller.js';
import express from 'express';

const router = express.Router();

/**
 * *note: all routes in this file are prefixed with /api/v1/membership-plans
 */

router.post('/', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', updateById);
router.delete('/:id', deleteById);

export default router;
