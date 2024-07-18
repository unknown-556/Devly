import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'


const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    
  },
  number: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
      type: Date,
  },
  
  
},
{
  timeStamps: true
}
);






const User = mongoose.model('User',userSchema)
export default User