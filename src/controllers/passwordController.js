import crypto from 'crypto';
import nodemailer from 'nodemailer';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

export const requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const passwordtoken = crypto.randomBytes(20).toString('hex');

        user.resetPasswordToken = passwordtoken;
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
            html: `
                <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 0;
                            background-color: #f4f4f4;
                        }
                        .container {
                            width: 100%;
                            max-width: 600px;
                            margin: 0 auto;
                            background-color: #ffffff;
                            padding: 20px;
                            border-radius: 10px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        }
                        .header {
                            background-color: #4CAF50;
                            color: #ffffff;
                            padding: 10px;
                            text-align: center;
                            border-top-left-radius: 10px;
                            border-top-right-radius: 10px;
                        }
                        .content {
                            padding: 20px;
                        }
                        .content h1 {
                            color: #333333;
                        }
                        .content p {
                            color: #666666;
                            line-height: 1.6;
                        }
                        .footer {
                            text-align: center;
                            padding: 10px;
                            background-color: #f4f4f4;
                            border-bottom-left-radius: 10px;
                            border-bottom-right-radius: 10px;
                        }
                        .footer a {
                            color: #4CAF50;
                            text-decoration: none;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Password Reset Request</h1>
                        </div>
                        <div class="content">
                            <p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
                            <p style="margin: 20px 0;">
                                <a href="http://${req.headers.host}/reset/${passwordtoken}"
                                   style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                                   Reset Password
                                </a>
                            </p>
                            <p>If the button above does not work, please click on the following link, or paste this into your browser to complete the process:</p>
                            <p>
                                <a href="http://${req.headers.host}/reset/${passwordtoken}">
                                    "http://${req.headers.host}/reset/${passwordtoken}"
                                </a>
                            </p>
                            <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
                        </div>
                        <div class="footer">
                            <p>Thank you,<br/><h1>Devly_</h1></p>
                            <p><a href="https://devlyng.vercel.app/">Visit our website</a></p>
                        </div>
                    </div>
                </body>
                </html>
            `,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Password reset link sent' });
    } catch (error) {
        console.log({error})
        res.status(500).json({ message: error.message });
    }
};


// "http://${req.headers.host}/reset/${passwordtoken}"

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
