import mongoose from 'mongoose';

const PortfolioSchema = new mongoose.Schema({
    name: {
        type: String,
        ref: "User",
        required: true,
    },
    portfolioLinks: {
        type: [String],
    },
    email: {
        type: String,
        ref: "User",
        required: true
    },
    phoneNumber: {
        type: String,
        ref: "User",
        required: true
    },
    bio: {
        type: String
    },
    experience: {
        type: String
    },
    title: {
        type: String
    },
    certificate: {
        type: String
    },
    degree: {
        type: String
    },
    skills: {
        type: [String]
    },
    languages: {
        type: [String]
    },
    socialAccounts: {
        instagram: {
            type: String
        },
        facebook: {
            type: String
        },
        github: {
            type: String
        },
        linkedIn: {
            type: String
        },
        twitter: {
            type: String
        }
    },
    location: {
        type: String
    },
    stack: {
        type: String,
    },
    profilePic: {
        type: String,
        default: '' 
    },
    status: {
        type: String,
        enum: ['Available', 'Unavailable'],
        default: 'Available'
    }
});

const Portfolio = mongoose.model('Portfolio', PortfolioSchema);

export default Portfolio;
