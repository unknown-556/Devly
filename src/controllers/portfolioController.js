import Portfolio from "../models/profileModel.js";
import User from "../models/userModel.js";






export const getPortfolios = async (req,res) => {
    try{
        const Portfolios = await Portfolio.find()
        if(!Portfolios){
            res.status(400).json ({message:'No Portfolios found in database'})
        }else {
            console.log({message:'Portfolios found successfully',Portfolios})
            return res.json({Portfolios})
        }
    
        }   catch (error) {
            console.error ('Error while getting all Portfolios')
            res.status(500).json({message:error.message})
            console.error(error);
        }
}    


export const getPortfolio = async (req, res) => {
    
    try {
        const stack = req.params.stack
        const Portfolios = await Portfolio.find({ stack: stack });

        if (Portfolios.length === 0) {
            return res.status(404).json({ message: 'No Portfolios found ' });
        } else {
            console.log('Portfolios found successfully', Portfolios);
            return res.json({ Portfolios });
        }
    } catch (error) {
        console.error('Error while getting Portfolios');
        return res.status(500).json({ message: error.message });
    }
};








export const getUser = async (req, res) => {
    try {
        const { firstName, lastName } = req.params;

        if (!firstName && !lastName) {
            return res.status(400).json({ message: 'First name or last name must be provided' });
        }

        const query = { $or: [] };
        if (firstName) query.$or.push({ firstName: firstName });
        if (lastName) query.$or.push({ lastName: lastName });

        const Portfolios = await Portfolio.find(query);

        if (Portfolios.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        } else {
            console.log('Portfolios found successfully', Portfolios);
            return res.json({ Portfolios });
        }
    } catch (error) {
        console.error('Error while getting portfolios', error);
        return res.status(500).json({ message: error.message });
    }
};








export const getportfolio = async (req, res) => {
    try {
        const portfolioId = req.params.id; 
        const portfolio = await Portfolio.findById(portfolioId);
        if (!portfolio) {
            return res.status(404).json({ message: `No Portfolio with ID: ${portfolioId} found` });
        } else {
            console.log('Portfolio found successfully', portfolio);
            // return res.status(200).json({ message: 'Portfolio found successfully', portfolio });
            return res.json({portfolio});
            
        }
    } catch (error) {
        console.error('Error while getting Portfolio', error);
        return res.status(500).json({ message: error.message });
    }
};



