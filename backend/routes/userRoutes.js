import express from 'express';;
import {  authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
    ,getAllUsers } from '../controllers/userController.js';
import {protect} from '../middleware/authMiddleware.js'
export const router = express.Router();


router.post('/', registerUser)
router.post('/auth', authUser)
router.post('/logout', logoutUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.get('/', getAllUsers)



export default router;

