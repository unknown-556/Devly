import express from "express";
const router=express.Router()
import{ getPortfolios, getPortfolio, getportfolio,  } from '../controllers/portfolioController.js'


router.get("/", getPortfolios)
router.get('/articles/:Stack',  getPortfolio);
router.get("/:id", getportfolio)

export default router