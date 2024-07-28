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
        console.log('Request body:', req.body); 
        console.log('Request files:', req.files); // Log the files to check if they are received

        const { title, about, link, tools, accounts, duration, started } = req.body;

        let imageUrl = "";
        let imageUrl2 = "";
        let imageUrl3 = "";
        let pdfUrl = "";

        if (req.files) {
            const uploadPromises = [];

            if (req.files.image && req.files.image[0]) {
                uploadPromises.push(
                    cloudinary.uploader.upload(req.files.image[0].path, {
                        resource_type: 'image',
                    }).then(uploadResponse => {
                        imageUrl = uploadResponse.secure_url;
                        console.log('Image 1 uploaded successfully:', imageUrl);
                    }).catch(error => {
                        console.error('Error uploading image 1:', error);
                    })
                );
            }

            if (req.files.image2 && req.files.image2[0]) {
                uploadPromises.push(
                    cloudinary.uploader.upload(req.files.image2[0].path, {
                        resource_type: 'image',
                    }).then(uploadResponse => {
                        imageUrl2 = uploadResponse.secure_url;
                        console.log('Image 2 uploaded successfully:', imageUrl2);
                    }).catch(error => {
                        console.error('Error uploading image 2:', error);
                    })
                );
            }

            if (req.files.image3 && req.files.image3[0]) {
                uploadPromises.push(
                    cloudinary.uploader.upload(req.files.image3[0].path, {
                        resource_type: 'image',
                    }).then(uploadResponse => {
                        imageUrl3 = uploadResponse.secure_url;
                        console.log('Image 3 uploaded successfully:', imageUrl3);
                    }).catch(error => {
                        console.error('Error uploading image 3:', error);
                    })
                );
            }

            if (req.files.pdf && req.files.pdf[0]) {
                uploadPromises.push(
                    cloudinary.uploader.upload(req.files.pdf[0].path, {
                        resource_type: 'raw', 
                    }).then(uploadResponse => {
                        pdfUrl = uploadResponse.secure_url;
                        console.log('PDF uploaded successfully:', pdfUrl);
                    }).catch(error => {
                        console.error('Error uploading PDF:', error);
                    })
                );
            }

            await Promise.all(uploadPromises);
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
