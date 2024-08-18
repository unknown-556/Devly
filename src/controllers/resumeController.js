import Portfolio from '../models/profileModel.js';
import Resume from '../models/resumeModel.js';
import User from '../models/userModel.js';



export const addResume = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const {dob, location, skills, About, Experience, Education, } = req.body
        console.log(req.body)


        const newResume = {
            dob, 
            email: user.email,
            number: user.number,
            location, 
            skills, 
            About, 
            Experience, 
            Education

        }

        const { id } = req.params;

        const updatedPortfolio = await Portfolio.findByIdAndUpdate(
            id,
            { $push: { resume: newResume } },
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
}




export const addEducation = async (req, res) => {
    const { id } = req.params;
    const { education } = req.body;
    try {
        const portfolio = await Portfolio.findById(id);
        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio not found' });
        }

        const resume = portfolio.resume[0];

        if (resume) {
            resume.Education.push(education);
            await portfolio.save();
            res.status(200).json({ message: 'Education added successfully', resume });
        } else {
            res.status(404).json({ message: 'Resume not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


export const addExperience = async (req, res) => {
    const { id } = req.params;
    const { experience } = req.body;

    try {
        const portfolio = await Portfolio.findById(id);
        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio not found' });
        }

        const resume = portfolio.resume[0];

        if (resume) {
            resume.Experience.push(experience);
            await portfolio.save();
            res.status(200).json({ message: 'Experience added successfully', resume });
        } else {
            res.status(404).json({ message: 'Resume not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


export const deleteEducation = async (req, res) => {
    const { id, eduId } = req.params;

    try {
        const portfolio = await Portfolio.findById(id);
        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio not found' });
        }

        const resume = portfolio.resume[0];

        if (resume) {
            resume.Education = resume.Education.filter(edu => edu._id.toString() !== eduId);
            await portfolio.save();
            res.status(200).json({ message: 'Education deleted successfully', resume });
        } else {
            res.status(404).json({ message: 'Resume not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


export const deleteExperience = async (req, res) => {
    const { id, expId } = req.params; 

    try {
        const portfolio = await Portfolio.findById(id);
        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio not found' });
        }

        const resume = portfolio.resume[0];

        if (resume) {
            resume.Experience = resume.Experience.filter(exp => exp._id.toString() !== expId);
            await portfolio.save();
            res.status(200).json({ message: 'Experience deleted successfully', resume });
        } else {
            res.status(404).json({ message: 'Resume not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
