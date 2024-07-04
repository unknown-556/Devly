import mongoose from 'mongoose';
// import { ObjectId } from 'mongodb';

const PortfolioSchema = new mongoose.Schema({
    Name: {
        type: String,
        ref: "User",
        required: true,
    },
    gender: {
        type: String,
        // required: true
    },
    Links: {
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
    Bio: {
        type: String
    },
    experience: {
        type: String
    },
    Skills: {
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