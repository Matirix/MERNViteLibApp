import {User} from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
// @desc Auth user/set token
// Route POST /api/users/auth
const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email})
    console.log(req.body)


    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error("Wrong Password")
    }

})
// @desc create new user
// POST /api/users/
const registerUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    console.log(req.body)
    const userExists = await User.findOne({email: email})
    if (userExists) {
        res.status(400);
        throw new Error('User already exists')
    }
    const user = User.create({
        email, password
    });

    if (user) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error("Invalid User Data")
    }
}) 

// @desc create new user
// POST /api/users/
// 
const getAllUsers = asyncHandler(async(req, res) => {
    const users = await User.find({})
    res.status(201).json({users: users})

})

// @desc log user out
// POST /api/users/logout
const logoutUser = asyncHandler(async(req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(201).json({message: "Successfully logged out!"})

})

// @desc get user profile
// GET /api/users/profile
const getUserProfile = asyncHandler(async(req, res) => {
    const user = {_id: req.user._id, email: req.user.email}
    res.status(200).json(user)
})

// @desc update user profile
// PUT /api/users/profile
const updateUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password;
        } 
        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            email: updatedUser.email,  
        })
    } else {
        res.status(404);
        throw new Error('User not found')
    }
})


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getAllUsers
}