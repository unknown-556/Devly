import Portfolio from "../models/profileModel.js";
import User from "../models/userModel.js";






export const getPortfolios = async (req,res) => {
    try{
        const allPortfolios = await Portfolio.find()
        if(!allPortfolios){
            res.status(400).json ({message:'No Portfolios found in database'})
        }else {
            console.log({message:'Portfolios found successfully',allPortfolios})
            return res.json({allPortfolios})
        }
    
        }   catch (error) {
            console.error ('Error while getting all Portfolios')
            res.status(500).json({message:error.message})
            console.error(error);
        }
}    


export const getPortfolio = async (req, res) => {
    
    try {
        const Stack = req.user.Stack
        const Portfolios = await Portfolio.find({ Stack: Stack });

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
        const name = req.user.name
        const Portfolios = await Portfolio.find({ name: name });

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




export const getportfolio = async (req, res) => {
    try {
        const portfolioId = req.params.id; 
        const portfolio = await Portfolio.findById(portfolioId);
        if (!portfolio) {
            return res.status(404).json({ message: `No Portfolio with ID: ${portfolioId} found` });
        } else {
            console.log('Portfolio found successfully', portfolio);
            return res.status(200).json({ message: 'Portfolio found successfully', portfolio });
            // return res.json({Portfolio});
            
        }
    } catch (error) {
        console.error('Error while getting Portfolio', error);
        return res.status(500).json({ message: error.message });
    }
};




