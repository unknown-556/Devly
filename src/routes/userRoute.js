import express from 'express';
import { getUserProfile, updateProfile } from '../controllers/userControllers.js';
import auth from '../middleware/auth.js';
import upload from "../config/multer.js";


const router = express.Router();

router.get('/profile', auth, getUserProfile);

router.patch('/update/:id', auth, upload.single('image'), updateProfile)

export default router;
