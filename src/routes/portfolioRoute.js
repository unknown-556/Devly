import express from "express";
const router=express.Router()
import{ getPortfolios, getPortfolio, getportfolio, getUser } from '../controllers/portfolioController.js'


router.get("/", getPortfolios)
router.get('/portfolio/:stack',  getPortfolio);
// router.get("/all/:firstName", getUser);
router.get('/user/:firstName?/:lastName?', getUser);
router.get("/:id", getportfolio)

export default router