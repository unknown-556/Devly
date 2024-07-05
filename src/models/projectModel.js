import mongoose from 'mongoose'
import { ObjectId } from 'mongodb';

const ProjectSchema = new mongoose.Schema({

    Id: {
        type: ObjectId,
        ref: 'user',
        required: true,
    },   
    image: {
        type: String
    },
    title: {
        type: String
    },
    About: {
        type: String
    },
    link: {
        type: String
    }
 })
    



const Project = mongoose.model('Project', ProjectSchema);

export default Project;