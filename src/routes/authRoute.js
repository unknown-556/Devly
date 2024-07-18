import express from "express";
const router = express.Router()
import { signUp,signIn, logout } from "../controllers/userControllers.js";



router.post("/signup",signUp)

router.post("/login",signIn)

router.post ("/logout", logout)

export default router;

