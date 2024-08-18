import User from '../models/userModel.js';
import Portfolio from '../models/profileModel.js';



export const getSingleUser = async (req, res) => {
    try {
        const email = req.params.email
        const singleUser = await User.findOne({email: email})
        if (!singleUser) {
        res.status(400).json({message: `No user with such id:${email} found`})
    }   else {
        res.status(200).json({message: 'User found successfully', singleUser})
        console.log(singleUser)
    }
    }   catch (error) {
        console.error('Error while getting single user',error);
        res.status(500).json({message: error.messaage})
    }
}

export const deleteSingleUser = async (req, res) => {
    try {
        const userId = req.params.id
        const userToDelete = await Portfolio.findByIdAndDelete(userId)
        if (!userToDelete) {
            res.status(400).json({message: `No portfolio with such id:${userId} found`})
        } else {
            res.status(200).json({message: 'Portfolio deleted successfully', userToDelete})
        }
    } catch (error) {
        console.error('Error while deleting user:',error);
        res.status(500).json({message: error.messaage})
    }
} 

export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        const userToDelete = await User.findByIdAndDelete(userId)
        if (!userToDelete) {
            res.status(400).json({message: `No user with such id:${userId} found`})
        } else {
            res.status(200).json({message: 'User deleted successfully', userToDelete})
        }
    } catch (error) {
        console.error('Error while deleting user:',error);
        res.status(500).json({message: error.messaage})
    }
} 