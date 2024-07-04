import express from "express";
const router = express.Router()
import { signUp,signIn } from "../controllers/userControllers.js";



router.post("/signup",signUp)

router.post("/login",signIn)

export default router;

