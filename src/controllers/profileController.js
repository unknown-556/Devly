import Portfolio from '../models/profileModel.js';
import Project from '../models/projectModel.js';
import User from '../models/userModel.js';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const createPortfolio = async (req, res) => {
       try {
            const user = await User.findById(req.user._id);
    
            let imageUrl = null;
    
            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path, {
                    resource_type: "image"
                });
                imageUrl = result.secure_url;
                console.log('Upload successful. Cloudinary response:', result);
            }

            
        const fname = req.user.firstName
        const lname = req.user.lastName    
     
            // const name = `${firstName} ${lastName}`; 
        const portfolio = new Portfolio({
            ...req.body,
            name: `${fname} ${lname}`,
            email: user.email,
            phoneNumber: user.phoneNumber,
            profilePic: imageUrl,
        });

        await portfolio.save();
        res.status(201).send(portfolio);
    } catch (error) {
        console.error('Error creating Portfolio:', error);
        res.status(400).send({ error: error.message });
    }
};





export const toggleStatus = async (req, res) => {
    try {
        const { id } = req.params;

        const portfolio = await Portfolio.findById(id);

        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio not found' });
        }

        const newStatus = portfolio.status === 'Available' ? 'Unavailable' : 'Available';

        portfolio.status = newStatus;
        await portfolio.save();

        res.status(200).json({ status: portfolio.status });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




export const addProject = async (req, res) => {
    try {
         const user = await User.findById(req.user._id);
 
         let imageUrl = null;
 
         if (req.file) {
             const result = await cloudinary.uploader.upload(req.file.path, {
                 resource_type: "image"
             });
             imageUrl = result.secure_url;
             console.log('Upload successful. Cloudinary response:', result);
         }

         
 
         
     const project = new Project({
         ...req.body,
         Id: user._id,
         image: imageUrl,
     });

     await project.save();
     res.status(201).send(project);
 } catch (error) {
     console.error('Error adding project:', error);
     res.status(400).send({ error: error.message });
 }
};

export const getproject = async (req, res) => {
    try {
        const projectId = req.params.Id; 
        const project = await Project.find({ Id: projectId});
        if (!project) {
            return res.status(404).json({ message: `No Project with ID: ${projectId} found` });
        } else {
            console.log('Project found successfully', project);
            return res.status(200).json({ message: 'Project found successfully', project });
            // return res.json({Project});
            
        }
    } catch (error) {
        console.error('Error while getting Project', error);
        return res.status(500).json({ message: error.message });
    }
};


