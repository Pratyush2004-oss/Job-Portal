import { User } from "../modals/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: 'Something is missing',
                success: false
            });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already registered with this email.',
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
        })

        return res.status(201).json({
            message: 'Account created successfully',
            success: true
        })
    } catch (error) {
        console.log('Error in Register Controller ' + error.message)
        return res.status(500).json({
            message: "Internal server Error",
            success: false
        })
    }
}

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
            message: `Welcome Back ${user.fullname}`,
            user,
            success: true
        })
    } catch (error) {
        console.log('Error in Login Controller ' + error.message)
        return res.status(500).json({
            message: "Internal server Error",
            success: false
        })
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", '', { maxAge: 0 }).json({
            message: "Logout Successfully",
            success: true
        })

    } catch (error) {
        console.log('Error in Logout Controller ' + error.message)
        return res.status(500).json({
            message: "Internal server Error",
            success: false
        })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;
        if (!fullname || !email || !phoneNumber || !bio || !skills) {
            return res.status(400).json({
                message: 'Something is missing',
                success: false
            });
        }

        // setting up the file by cloudinary

        const skillsArray = skills.split(',');
        const userId = req.id;  //middleware authentication
        let user = await User.findById({ userId })
        if (!user) {
            return res.status(400).json({
                message: 'User not found',
                success: false
            });
        }

        // updating data
        user.fullname = fullname,
            user.email = email,
            user, phoneNumber = phoneNumber,
            user.profile.bio = bio,
            user.profile.skills = skillsArray

        // resume comes later here.....

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
            uesr,
            success: true,
        })

    } catch (error) {
        console.log('Error in Profile-Update Controller ' + error.message)
        return res.status(500).json({
            message: "Internal server Error",
            success: false
        })
    }

}