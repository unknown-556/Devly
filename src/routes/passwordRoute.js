import express from 'express';
import { requestPasswordReset, resetPassword } from '../controllers/passwordController.js';


const router = express.Router();

router.post('/forgot-password', requestPasswordReset);
router.post('/reset-password', resetPassword);

export default router;
