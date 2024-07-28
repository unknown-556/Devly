import express from "express";
const router = express.Router()

import { createPortfolio, toggleStatus, addProject, deleteAllProjects } from "../controllers/profileController.js";
import auth from "../middleware/auth.js";
import upload from "../config/multer.js";


router.post("/profile", auth, upload.single('image'), createPortfolio)

router.patch('/status/toggle', auth, toggleStatus);

router.post("/project/:id", upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'pdf', maxCount: 1 },
]), addProject);

router.delete('/portfolio/:id/projects', deleteAllProjects);




export default router