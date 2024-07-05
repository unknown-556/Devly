import express from "express";
const router = express.Router()

import { createPortfolio, toggleStatus, addProject } from "../controllers/profileController.js";
import auth from "../middleware/auth.js";
import upload from "../config/multer.js";


router.post("/profile", auth, upload.single('image'), createPortfolio)

router.patch('/:id/status/toggle', toggleStatus);

router.post("/project", auth, upload.single('image'), addProject)


export default router