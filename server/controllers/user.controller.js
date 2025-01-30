import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../cloudinary.js";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please fill all fields', success: false })
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: 'User created successfully' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to register' })

    }
}

export const login = async (req, res) => {
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Please fill all fields', success: false })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Incorrect email or  password' })
        }

        generateToken(res, user, `Welcome back ${user.name}`);


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to register' })
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({ success: true, message: 'Logged out successfully' })
    } catch (error) {
        console.log(error);
       return res.status(500).json({ success: false, message: 'Failed to logout' })
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const userId = req.id; // we get userId from the middleware isAuthenticated

        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User does not exist', success: false })
        }
        return res.status(200).json({ success: true, user })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Failed to load user' })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const userId = req.id; // we get userId from the middleware isAuthenticated
        const { name } = req.body;
        const profilePhoto = req.file;

        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: 'User does not exist', success: false })
        }

        // extract public id of the preves image if it exists
        if (user.photoUrl) {
            const publicId = user.photoUrl.split('/').pop().split('.')[0] // extracting the public id from the url of the user
            deleteMediaFromCloudinary(publicId)
        }

        // upload new image to cloudinary
        const cloudResponse = await uploadMedia(profilePhoto.path)

        const photoUrl = cloudResponse.secure_url // extracting the url of the image from the cloudinary response

        const updatedData = { name, photoUrl } // updating the user data with the new image url

        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true }).select("-password");

        return res.status(200).json({
            success: true,
            user: updatedUser,
            message: "Profile updated successfully."
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Failed to update profile' })
    }
}

