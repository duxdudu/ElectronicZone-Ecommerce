import express from 'express';
import { signup, login, protect, restrictTo } from '../controllers/authController.js';

const router = express.Router();

// Authentication routes
router.post('/signup', signup);
router.post('/login', login);

// Protected routes
router.use(protect);

// Admin only routes
router.use(restrictTo('admin'));

export default router;