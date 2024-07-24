import express from 'express';
import { deleteSingleUser, getSingleUser, getUserProfile, logout, updateProfile, updateUser , deleteProject} from '../controllers/userControllers.js';
import auth from '../middleware/auth.js';
import upload from "../config/multer.js";


const router = express.Router();

router.get('/profile', auth, getUserProfile);

router.patch('/update/:id', auth,  upload.single('profileImage'), updateProfile)

router.post('/logout', auth, logout)

router.patch('/change', auth, updateUser)

router.delete('/delete/:id', deleteSingleUser)

router.get('/single/:email', getSingleUser)


router.delete('/portfolio/:id/project/:projectId', deleteProject);

export default router;
