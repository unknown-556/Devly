import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    image: {
        type: String, 
    },
    image2: {
        type: String, 
    },
    image3: {
        type: String, 
    },
    pdf: {
        type: String
    },
    title: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    tools: {
        type: [String]
    },
    duration: {
        type: [String]
    },
    started: {
        month: {
            type: String
        },
        year: {
            type: String
        }
    },
    link: {
        type: String,
        required: true,
    },
    accounts: [{
        link: {
            type: String,
        },
        platform: {
            type: String,
        }
    }],
}, { timestamps: true });

const PortfolioSchema = new mongoose.Schema({
    firstname: {
        type: String,
        ref: "User",
        required: true,
    },
    lastname: {
        type: String,
        ref: "User",
        required: true,
    },
    portfolio: {
        type: [String],
    },
    email: {
        type: String,
        ref: "User",
        required: true,
    },
    number: {
        type: String,
        ref: "User",
        required: true,
    },
    bio: {
        type: String,
    },
    experience: {
        type: String,
    },
    title: {
        type: String,
    },
    certificates: {
        type: [String],
    },
    degrees: [{
        course: {
            type: String,
        },
        degree: {
            type: String,
        },
        institution: {
            type: String,
        },
        year: {
            type: String,
        },
    }],
    skills: {
        type: [String],
    },
    languages: {
        type: [String],
    },
    accounts: [{
        link: {
            type: String,
        },
        platform: {
            type: String,
        }
    }],
    country: {  
        type: String,
    },
    stack: {
        type: String,
    },
    profileImage: {
        type: String,
        default: '',
    },
    projects: [projectSchema], 
    status: {
        type: String,
        enum: ['Available', 'Unavailable'],
        default: 'Available',
    }
});

const Portfolio = mongoose.model('Portfolio', PortfolioSchema);

export default Portfolio;
