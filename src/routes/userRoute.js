import express from 'express';
import { getUserProfile, logout, updateProfile } from '../controllers/userControllers.js';
import auth from '../middleware/auth.js';
import upload from "../config/multer.js";


const router = express.Router();

router.get('/profile', auth, getUserProfile);

router.patch('/update/:id',  upload.single('profileImage'), updateProfile)

router.post('/logout', auth, logout)

export default router;
