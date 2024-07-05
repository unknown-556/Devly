import mongoose from 'mongoose';
// import { ObjectId } from 'mongodb';

const PortfolioSchema = new mongoose.Schema({
    name: {
        type: String,
        ref: "User",
        required: true,
    },
    gender: {
        type: String,
        // required: true
    },
    portfolioLinks: {
        type: [String],
    },
    email: {
        type: String,
        ref: "User",
        required: true
    },
    phonenumber: {
        type: String,
        ref: "User",
        required: true
    },
    Bio: {
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
    Skills: {
        type: [String]
    },
    language: {
        type: [String]
    },
    account: [
        {
            Instagram: {
                type: String
            },
            Facebook: {
                type: String
            },
            Github: {
                type: String
            },
            LinkedIn: {
                type: String
            },
            Twitter: {
                type: String
            },
            
        }
    ],
    Location: {
        type: String
    },  
    Stack: {
        type: String,
    },
    profilePic: {
        type: String,
        default: '' 

    },
    Status: {
        type: String,
        default: "Available"
      }
    
});

const Portfolio = mongoose.model('Portfolio', PortfolioSchema);

export default Portfolio;