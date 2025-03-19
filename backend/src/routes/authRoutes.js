import express from 'express';
import { signup, signin, protect, updateProfile } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);

// Protected routes
router.use(protect);
router.patch('/updateProfile', updateProfile);

export default router;