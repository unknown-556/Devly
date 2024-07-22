import express from "express";
const router = express.Router()
import { allMessages, message } from "../controllers/messageController.js";



router.post("/add", message)

router.post("/get" , allMessages)


export default router;