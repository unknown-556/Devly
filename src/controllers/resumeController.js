import Portfolio from '../models/profileModel.js';
import Resume from '../models/resumeModel.js';
import User from '../models/userModel.js';



export const createResume = async (req, res) => {
       try {
            const user = await User.findById(req.user._id);

               
                    const resume = new Resume({
                        ...req.body,
                        email: user.email,
                        number: user.number,
                    });

        await resume.save();
        res.status(201).send(resume);
    } catch (error) {
        res.status(400).send({ error: error.message });
        console.error('Error creating Resume:', error);
        return res.json({message: error.message})
    }
};


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


export const getResume = async (req, res) => {
    try {
        const email = req.user.email
        const resume = await Resume.findOne({email});
        
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        return res.json({ resume })
        // res.status(200).json(resume);

    } catch (error) {
        return res.status(500).json({ message: 'Error fetching resume', error });
    }
};

export const addExperience = async (req, res) => {
    try {
        const {Started, Ended, Org, Title, Description } = req.body
        console.log(req.body)


        const newExperience = {
            Started,
            Ended, 
            Org, 
            Title, 
            Description

        }

        const { id } = req.params;

        const updatedResume = await Resume.findByIdAndUpdate(
            id,
            { $push: { Experience: newExperience } },
            { new: true }
        );

        if (!updatedResume) {
            return res.status(404).json({ message: 'Resume not found' });
        }


    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log({ message: error.message });
    }
}

export const addEducation = async (req, res) => {
    try {
        const {Started, Ended, University, Degree, Description } = req.body
        console.log(req.body)


        const newEducation = {
            Started,
            Ended, 
            University, 
            Degree, 
            Description

        }

        const { id } = req.params;

        const updatedResume = await Resume.findByIdAndUpdate(
            id,
            { $push: { Education: newEducation } },
            { new: true }
        );

        if (!updatedResume) {
            return res.status(404).json({ message: 'Resume not found' });
        }


    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log({ message: error.message });
    }
}

export const deleteResume = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedPortfolio = await Portfolio.findByIdAndUpdate(
            id,
            { $set: { resume: [] } },
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