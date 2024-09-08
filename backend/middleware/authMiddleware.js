import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

// Protect routes with JWT authentication middleware
const protect = asyncHandler(async(req, res, next) => {
    let token;
    
    // Read the JWT token from the cookie
    //token = req.cookies.jwt;
    token = req.cookies.jwt || req.headers.Authorization.startsWith("Bearer ").split(' ')[1];

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select
            ('-password');
            next();
        } catch (error) {
            console.log(error)
            res.status(401);
            throw new Error('Token is invalid');
        }

    } else {
        res.status(401);
        throw new Error('Not authorized, token is required');
    }
});


// Grant access to admin routes
const admin = (req, res, next) => {
    
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Unauthorized, admin access required');
    }
};

export {
    protect,
    admin
};