import express from "express";
const router=express.Router()
import{ getPortfolios, getPortfolio, getportfolio, getUser } from '../controllers/portfolioController.js'


router.get("/", getPortfolios)
router.get('/portfolio/:Stack',  getPortfolio);
router.get("/portfolio/:name", getUser);
router.get("/:id", getportfolio)

export default router