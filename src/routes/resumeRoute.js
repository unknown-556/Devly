import express from 'express';
import auth from '../middleware/auth.js';
import {
    addEducation,
    addExperience,
    createResume,
    deleteResume,
    getResume
} from '../controllers/resumeController.js';

const router = express.Router();

router.post('/resume', auth, createResume);
router.get('/resume/:email', auth, getResume)
router.delete('/delete/resume/:id', auth, deleteResume);

router.post('/add/education/:id', addEducation)
router.post('/add/experience/:id', addExperience)

export default router;
