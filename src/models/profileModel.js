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
    },
    about: {
        type: String,
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
    resume: [ResumeSchema],
    status: {
        type: String,
        enum: ['Available', 'Unavailable'],
        default: 'Available',
    }
});

const Portfolio = mongoose.model('Portfolio', PortfolioSchema);

export default Portfolio;
