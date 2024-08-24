import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

// user registration controller
export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: 'Something is missing',
                success: false
            });
        }
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already registered with this email.',
                success: false
            })
        }
        user = await User.findOne({ phoneNumber });
        if (user) {
            return res.status(400).json({
                message: 'User already registered with this mobile number.',
                success: false
            })
        }
        const hashedpassword = await bcrypt.hash(password, 10);
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedpassword,
            role,
            profile: {
                profilePic: cloudResponse.secure_url,
            }
        })

        return res.status(201).json({
            message: 'Account created successfully',
            success: true
        })

    } catch (error) {
        console.log('Error in Register user Controller ' + error.message)
        return res.status(500).json({
            message: "Internal server Error",
            success: false
        })
    }
}

// user login controller
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: 'Something is missing',
                success: false
            });
        }
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: 'User not found',
                success: false
            });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: 'Password doesnot match',
                success: false
            });
        }
        // checking the role is coreect or not
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exists with current role",
                success: false
            });
        }

        const TokenData = {
            userId: user._id
        }
        const token = await jwt.sign(TokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })
    } catch (error) {
        console.log('Error in Login user Controller ' + error.message)
        return res.status(500).json({
            message: "Internal server Error",
            success: false
        })
    }
}

// User Logout Controller
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", '', { maxAge: 0 }).json({
            message: "Logout Successfully",
            success: true
        })

    } catch (error) {
        console.log('Error in user Logout Controller ' + error.message)
        return res.status(500).json({
            message: "Internal server Error",
            success: false
        })
    }
}

// user update profile controller
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;

        // setting up the file by cloudinary
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        let skillsArray;
        if (skills) {
            skillsArray = skills.split(',');
        }
        const userId = req.id;  //middleware authentication
        let user = await User.findById(userId)
        if (!user) {
            return res.status(400).json({
                message: 'User not found',
                success: false
            });
        }

        // updating data
        if (fullname) user.fullname = fullname
        if (phoneNumber) user.phoneNumber = phoneNumber
        if (bio) user.profile.bio = bio
        if (email) user.email = email
        if (skills) user.profile.skills = skillsArray

        // resume comes later here.....
        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url // save file url
            user.profile.resumeOriginalName = file.originalname //save original file name 
        }

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }
        return res.status(200).json({
            message: 'User updated successfully...',
            user,
            success: true,
        })

    } catch (error) {
        console.log('Error in user Profile-Update Controller ' + error.message)
        return res.status(500).json({
            message: "Internal server Error",
            success: false
        })
    }

}