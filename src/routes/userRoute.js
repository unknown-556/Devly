import express from 'express';
import { getUserProfile } from '../controllers/userControllers.js';
import auth from '../middleware/auth.js';


const router = express.Router();

router.get('/profile', auth, getUserProfile);

export default router;
