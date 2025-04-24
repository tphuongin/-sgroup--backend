import express from 'express';
import userRoutes from './user/user.router.js';
import authRoutes from './auth/auth.router.js';

const router = express.Router();

// User routes
router.use('/users', userRoutes);

// Auth routes
router.use('/auth', authRoutes);

export default router;