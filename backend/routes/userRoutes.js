import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {  authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
,getAllUsers } from '../controllers/userController.js';

export const router = express.Router();


router.post('/', registerUser)
router.post('/auth', authUser)
router.post('/logout', logoutUser)
router.route('/profile').get(getUserProfile).put(updateUserProfile)
router.get('/', getAllUsers)



export default router;

