import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { User } from '../models/userModel.js';

// Small JWT lesson in understanding it. JWT contains user's information codified in the generate token function using the user's information (set by you)
// and then the secret key. Using the token and the secret key, we can use jwt.verify to ascertain the user's id to get the user's information
const protect = asyncHandler(async(req, res, next) => {
    let token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // don't return the password
            req.user = await User.findById(decoded.userId).select('-password');
            next()
        } catch (error) {
            res.status(401);
            throw new Error('Unauthorized, invalid token')
        }

    } else {
        res.status(401);
        throw new Error("Unauthorized Access: No token")
    }

})

export { protect } ;