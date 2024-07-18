import express from "express";
const router = express.Router()

import { createPortfolio, toggleStatus, addProject, getproject } from "../controllers/profileController.js";
import auth from "../middleware/auth.js";
import upload from "../config/multer.js";


router.post("/profile", auth, upload.single('image'), createPortfolio)

router.patch('/status/toggle', auth, toggleStatus);

router.post("/project/:id", auth, upload.single('image'), addProject)

router.get("/all/:Id", getproject)


export default router