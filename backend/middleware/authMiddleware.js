import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

// Protect routes with JWT authentication middleware
const protect = asyncHandler(async(req, res, next) => {
    let token;
    
    // Read the JWT token from the cookie
    //token = req.cookies.jwt;
    //token = req.cookies.jwt || req.headers.Authorization.startsWith("Bearer ").split(' ')[1];
    
    const authHeader = req.headers.Authorization || req.headers.authorization || '';

    // Read the JWT token from the cookie
    token = req.cookies.jwt ||  authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

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
    
    if (req.user && (req.user.isAdmin || req.user.isAgent)) {
        next();
    } else {
        res.status(401);
        throw new Error('Unauthorized, access required');
    }
};

// Grant access to agent routes
const agent = (req, res, next) => {
    
    if (req.user && req.user.isAgent) {
        next();
    } else {
        res.status(401);
        throw new Error('Unauthorized, agent access required');
    }
};
export {
    protect,
    admin,
    agent
};