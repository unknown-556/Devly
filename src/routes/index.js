import express from "express";
import Portfolio from "../models/profileModel.js";

import authRoute from './authRoute.js'
import postRoute from './profileRoute.js'
import portfolioRoute from './portfolioRoute.js'
import userRoute from './userRoute.js'
import passwordRoute from './passwordRoute.js'

const router = express.Router()

router.use('/password', passwordRoute)
router.use('/auth', authRoute)
router.use('/post', postRoute )
router.use('/portfolio', portfolioRoute)
router.use('/get', userRoute)

router.patch('/portfolios/:id/status', async (req, res) => {
    const { id } = req.params;
    try {
        const portfolio = await Portfolio.findById(id);
        if (!portfolio) {
            return res.status(404).send({ error: 'Portfolio not found' });
        }

        // Toggle status between "Available" and "Unavailable"
        portfolio.Status = portfolio.Status === 'Available' ? 'Unavailable' : 'Available';
        await portfolio.save();

        res.status(200).send(portfolio);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});


export default router;