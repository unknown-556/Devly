import mongoose from 'mongoose';

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
        required: true
    },
    number: {
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
    certificates: {
        type: [String]
    },
    degrees: {
        type: [String]
    },
    skills: {
        type: [String]
    },
    languages: {
        type: [String]
    },
    accounts: {
        instagramUsername: {
            type: String
        },
        githubUsername: {
            type: String
        },
        linkedinUsername: {
            type: String
        },
        twitterUsername: {
            type: String
        }
    },
    country: {
        type: String
    },
    stack: {
        type: String,
    },
    profileImage: {
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
