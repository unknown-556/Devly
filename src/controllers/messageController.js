import Message from "../models/messageModel.js";

export const message = async (req, res) => {
    try {
        const { name, email, content } = req.body;

        const newMessage = new Message({
            name,
            email,
            content
        });

        await newMessage.save();
        console.log('Message saved successfully', newMessage);
        
        return res.status(200).json({ message: 'Message sent successfully', newMessage });
    } catch (error) {
        console.log('INTERNAL SERVER ERROR', error.message);
        return res.status(400).json({ message: error.message });
    }
};

export const allMessages = async (req, res) => {
    try {
        const allMessages = await Message.find()
        if (!allMessages) {
        res.status(400).json({message: 'No messages found in database'})
    }   else {
        res.status(200).json({message: 'Messages found successfully', allMessages})
    }
    }   catch (error) {
        console.error('Error while getting all users:',error);
        res.status(500).json({message: error.messaage})
    }
}
