import crypto from 'crypto';
import nodemailer from 'nodemailer';
import User from '../models/userModel.js';

export const requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const token = crypto.randomBytes(20).toString('hex');

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            to: user.email,
            from: process.env.EMAIL,
            subject: 'Password Reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
                  `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
                  `http://${req.headers.host}/reset/${token}\n\n` +
                  `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Password reset link sent' });
    } catch (error) {
        console.log({error})
        res.status(500).json({ message: error.message });
    }
};

// export const resetPassword = async (req, res) => {
//     const { token, newPassword } = req.body;

//     try {
//         const user = await User.findOne({
//             resetPasswordToken: token,
//             resetPasswordExpires: { $gt: Date.now() },
//         });

//         if (!user) {
//             return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
//         }

//         user.password = newPassword;
//         user.resetPasswordToken = undefined;
//         user.resetPasswordExpires = undefined;

//         await user.save();

//         res.status(200).json({ message: 'Password has been reset' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
