import { login, register } from '#controllers/auth.controller.js';
import express from 'express';

const router = express.Router();

/**
 * *note: all routes in this file are prefixed with /api/v1/auth
 */

router.post('/register', register);
router.post('/login', login);

export default router;
