import express from 'express';
import { requestPasswordReset } from '../controllers/passwordController.js';
import { updateUser } from '../controllers/userControllers.js';

const router = express.Router();

router.post('/forgot-password', requestPasswordReset);
router.post('/reset-password', updateUser);

export default router;
