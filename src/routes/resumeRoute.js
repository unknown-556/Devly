import express from 'express';
import auth from '../middleware/auth.js';
import {
    addEducation,
    addExperience,
    addResume,
    deleteEducation,
    deleteExperience,
} from '../controllers/resumeController.js';

const router = express.Router();

router.put('/portfolios/:id/education', addEducation);
router.put('/portfolios/:id/experience', addExperience);
router.delete('/portfolios/:id/education/:eduId', deleteEducation);
router.delete('/portfolios/:id/experience/:expId', deleteExperience);

router.post('/add/education/:id', addEducation)
router.post('/add/experience/:id', addExperience)

router.post('/add/:id', auth, addResume)

export default router;
