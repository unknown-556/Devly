import mongoose from 'mongoose'


const MessageSchema = new mongoose.Schema({

    name: {
        type: String
    },
    email: {
        type: String    
    },
    content: {
        type: String
    }
 })
    



const Message = mongoose.model('Project', MessageSchema);

export default Message;