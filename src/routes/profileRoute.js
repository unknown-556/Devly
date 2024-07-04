import express from "express";
const router = express.Router()

import { createPortfolio } from "../controllers/profileController.js";
import auth from "../middleware/auth.js";
import upload from "../config/multer.js";


router.post("/profile", auth, upload.single('image'), createPortfolio)


export default router