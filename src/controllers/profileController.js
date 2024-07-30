import Portfolio from '../models/profileModel.js';
import User from '../models/userModel.js';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import { formatZodError } from '../../errorMessage.js';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const createPortfolio = async (req, res) => {
       try {
            const user = await User.findById(req.user._id);

            const email = await User.findOne({ email: req.user.email });

            if (!email) {
                return res.status(404).json({ message: 'User not found' });
            }

            const existingPortfolio = await Portfolio.findOne({ email: req.user.email });


            if (existingPortfolio) {
                return res.status(400).json({ message: 'You already have a portfolio' });
            }
 
            
    
            let imageUrl = "";

            const { profileImage } = req.body;

            if (profileImage) {
                
                const uploadResponse = await cloudinary.uploader.upload(profileImage, {
                    resource_type: 'image',
                });
                imageUrl = uploadResponse.secure_url;
            }

            
        // const fname = req.user.firstName
        // const lname = req.user.lastName    
     
            // const name = `${firstName} ${lastName}`;
            
               
                    const portfolio = new Portfolio({
                        ...req.body,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email,
                        number: user.number,
                        profileImage: imageUrl,
                    });

        await portfolio.save();
        res.status(201).send(portfolio);
    } catch (error) {
        res.status(400).send({ error: error.message });
        console.error('Error creating Portfolio:', error);
        return res.json({message: error.message})
    }
};





export const toggleStatus = async (req, res) => {
    try {
        const { email } = req.user;

        const portfolio = await Portfolio.findOne({ email });

        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio not found' });
        }

        const newStatus = portfolio.status === 'Available' ? 'Unavailable' : 'Available';

        portfolio.status = newStatus;
        await portfolio.save();

        return res.json({ status: portfolio.status });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};











cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});





export const addProject = async (req, res) => {
    try {
        const { image, image2, image3, pdf, title, about, link, tools, accounts, duration, started } = req.body;
        console.log('Request body:', req.body);

        let imageUrl = "";
        let imageUrl2 = "";
        let imageUrl3 = "";
        let pdfUrl = "";

        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image, {
                resource_type: 'auto',
            });
            imageUrl = uploadResponse.secure_url;
            console.log('Image 1 uploaded successfully:', imageUrl);
        }

        if (image2) {
            const uploadResponse = await cloudinary.uploader.upload(image2, {
                resource_type: 'auto',
            });
            imageUrl2 = uploadResponse.secure_url;
            console.log('Image 2 uploaded successfully:', imageUrl2);
        }

        if (image3) {
            const uploadResponse = await cloudinary.uploader.upload(image3, {
                resource_type: 'auto',
            });
            imageUrl3 = uploadResponse.secure_url;
            console.log('Image 3 uploaded successfully:', imageUrl3);
        }

        if (pdf) {
            const uploadResponse = await cloudinary.uploader.upload(pdf, {
                resource_type: 'raw',
            });
            pdfUrl = uploadResponse.secure_url;
            console.log('PDF uploaded successfully:', pdfUrl);
        }

        const newProject = {
            image: imageUrl,
            image2: imageUrl2,
            image3: imageUrl3,
            pdf: pdfUrl,
            title,
            about,
            link,
            tools,
            accounts,
            duration,
            started,
        };

        console.log('New project data:', newProject);

        const { id } = req.params;

        const updatedPortfolio = await Portfolio.findByIdAndUpdate(
            id,
            { $push: { projects: newProject } },
            { new: true }
        );

        if (!updatedPortfolio) {
            return res.status(404).json({ message: 'Portfolio not found' });
        }

        res.status(200).json(updatedPortfolio);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log({ message: error.message });
    }
};






export const deleteAllProjects = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedPortfolio = await Portfolio.findByIdAndUpdate(
            id,
            { $set: { projects: [] } },
            { new: true }
        );

        if (!updatedPortfolio) {
            return res.status(404).json({ message: 'Portfolio not found' });
        }

        res.status(200).json({ message: 'All projects deleted successfully', updatedPortfolio });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
        console.error('Error deleting all projects:', error);
    }
};
