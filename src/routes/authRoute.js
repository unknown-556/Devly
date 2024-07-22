import express from "express";
const router = express.Router()
import { signUp,signIn, logout, deleteUser } from "../controllers/userControllers.js";



router.post("/signup",signUp)

router.post("/login",signIn)

router.post ("/logout", logout)

router.delete("/delete/:id", deleteUser)

export default router;

