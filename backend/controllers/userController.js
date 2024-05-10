import {User} from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
// @desc Auth user/set token
// Route POST /api/user/auth
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

const getAllUsers = asyncHandler(async(req, res) => {
    const users = await User.find({})
    res.status(201).json({users: users})

})

const logoutUser = asyncHandler(async(req, res) => {
    res.status(200).json({message: "Message receieved"})
})

const getUserProfile = asyncHandler(async(req, res) => {
    res.status(200).json({message: "Message receieved"})
})

const updateUserProfile = asyncHandler(async(req, res) => {
    res.status(200).json({message: "Message receieved"})
})


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getAllUsers
}