
import mongoose from 'mongoose';

const ResumeSchema = new mongoose.Schema({
    dob: {
        type: String,
    },
    location: {
        type: String,
    },
    skills: {
        type: [String],
    },
    email: {
        type: String,
        ref: "User",
    },
    number: {
        type: String,
        ref: "User",
    },
    About: {
        type: String,
    },
    Experience: [{
        Started: {
            type: String,
        },
        Ended: {
            type: String
        },
        Org: {
            type: String
        },
        Title: {
            type: String
        },
        Description: {
            type:String
        }
    }],
    // v_experience: [{
    //     Started: {
    //         type: String,
    //     },
    //     Ended: {
    //         type: String
    //     },
    //     Org: {
    //         type: String
    //     },
    //     Title: {
    //         type: String
    //     },
    //     Description: {
    //         type:String
    //     }
    // }],
    Education: [{
        Started: {
            type: String,
        },
        Ended: {
            type: String
        },
        University: {
            type: String
        },
        Degree: {
            type: String
        },
        Description: {
            type:String
        }
    }],
    
});

const Resume = mongoose.model('Resume', ResumeSchema);

export default Resume;
