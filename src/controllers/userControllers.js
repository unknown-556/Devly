import User from '../models/userModel.js';
import Portfolio from '../models/profileModel.js';
import cryptoHash from 'crypto';
import { signUpValidator, signInValidator } from '../validators/authValidators.js';
import { formatZodError } from '../../errorMessage.js';
import main from '../../server.js'; 
import { generateToken } from '../utils/jwt.js';
import { v2 as cloudinary } from 'cloudinary';
import { error } from 'console';

const hashValue = (value) => {
    const hash = cryptoHash.createHash('sha256');
    hash.update(value);
    return hash.digest('hex');
};

const comparePasswords = (inputPassword, hashedPassword) => {
    return hashValue(inputPassword) === hashedPassword;
};

export const signUp = async (req, res) => {
    const registerResults = signUpValidator.safeParse(req.body)
    if (!registerResults) {
        return res.status(400).json(formatZodError(registerResults.error.issues))
    }
    try {
        const { email}=req.body 
        const existingUser = await User.findOne({ $or: [ { email }] });
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists', user: existingUser });
      } else {
            const {
                firstname,
                lastname,
                number,
                password,
                email,
            } = req.body


            
            const encryption = hashValue(password)
            const newUser = new User({
                firstname,
                lastname,
                number,
                password: encryption,
                email,
            })
            await newUser.save()
            res.status(200).json({message: 'User registered succesfully',newUser})
            console.log('User registered succesfully',newUser);
            return res.json({message: 'User registered succesfully'})
        }
    } catch (error) {
        console.log('INTERNAL SERVER ERROR',error.message)
        return res.status(400).json({message: error.message})
        
        // return res.json({message: error.message})
    }
}




export const signIn = async (req, res, next) => {
    const loginResults = signInValidator.safeParse(req.body);
    if (!loginResults.success) {
        return res.status(400).json(formatZodError(loginResults.error.issues));
    } 
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User with email not found' });
        }
        
        const comparePass = comparePasswords(password, user.password);
        if (!comparePass) {
            console.log({ message: 'Password is incorrect' });
            // return res.json({message: 'password is incorrect'})
            return res.status(400).json({message:'Password is incorrect'})
        }
        
        
        const accessToken = generateToken(user._id, user.name);
        

        user.token = accessToken;
        await user.save();
        main.io.emit('user-login', { userId: user._id, name: user.name, email: user.email });

        console.log('Login   successful', user, accessToken);
        return res.json({ accessToken });
        

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log('INTERNAL SERVER ERROR', error.message);
    }
};


export const getUserProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const email = req.user.email
        const user = await Portfolio.findOne({email});

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        console.log(`User ID: ${userId}, User Data: ${JSON.stringify(user)}`);
        return res.json({ user })

        // res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.error('Internal server error:', error);
    }
};


export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.email;

        let imageUrl = "";

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                resource_type: 'image',
            });
            imageUrl = result.secure_url;
            console.log('Upload successful. Cloudinary response:', result);
            rest.profileImage = imageUrl;
        }


        const updatedUser = await Portfolio.findByIdAndUpdate(
            userId,
            { $set: rest },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: `User with email: ${userId} not found` });
        }

        return res.status(200).json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
        console.error('Error while updating User:', error);
        res.status(400).json({ message: error.message });
    }
};


export const updateUser = async (req, res) => {
    try {
      const userId = req.user._id;
      const { password, ...rest } = req.body;
  
      if (password) {
        const hashedPassword = cryptoHash.createHash('sha256').update(password).digest('hex');
  
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { ...rest, password: hashedPassword },
          { new: true }
        );
  
        if (!updatedUser) {
          return res.status(404).json({ message: `User with id: ${userId} not found` });
        }
  
        return res.status(200).json({ message: 'User updated successfully', updatedUser });
      } else {
        const updatedUser = await User.findByIdAndUpdate(userId, rest, { new: true });
  
        if (!updatedUser) {
          return res.status(404).json({ message: `User with id: ${userId} not found` });
        }
  
        return res.status(200).json({ message: 'User updated successfully', updatedUser });
      }
    } catch (error) {
      console.error('Error while updating User:', error);
      res.status(400).json({ message: error.message });
    }
  };





export const logout = async (req, res, next) => {
    try {
      res.clearCookie('jwt');
  
      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
      console.error('INTERNAL SERVER ERROR', error.message);
    }
  };


  export const deleteSingleUser = async (req, res) => {
    try {
        const userId = req.params.id
        const userToDelete = await Portfolio.findByIdAndDelete(userId)
        if (!userToDelete) {
            res.status(400).json({message: `No user with such id:${userId} found`})
        } else {
            res.status(200).json({message: 'User deleted successfully', userToDelete})
        }
    } catch (error) {
        console.error('Error while deleting user:',error);
        res.status(500).json({message: error.messaage})
    }
}  

export default { signUp, signIn, getUserProfile, updateProfile, deleteSingleUser };
