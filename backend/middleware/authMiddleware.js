// import jwt from 'jsonwebtoken';
// import asyncHandler from './asyncHandler.js';
// import User from '../models/userModel.js';

// // Protect routes with JWT authentication middleware
// const protect = asyncHandler(async (req, res, next) => {
//   let token;

//   // Get the authorization header or cookie
//   const authHeader = req.headers.authorization || req.headers.Authorization || '';
  
//   // Check for token in cookies or Authorization header
//   token = req.cookies?.jwt || (authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null);

//   if (token) {
//     try {
//       // Verify token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
//       // Get user from the token and exclude the password
//       req.user = await User.findById(decoded.userId).select('-password');
      
//       next();
//     } catch (error) {
//       console.error(error);
//       res.status(401);
//       throw new Error('Invalid token');
//     }
//   } else {
//     res.status(401);
//     throw new Error('Not authorized, token is missing');
//   }
// });

// // Grant access to admin routes
// const admin = (req, res, next) => {
//   if (req.user && (req.user.isAdmin || req.user.isAgent)) {
//     next();
//   } else {
//     res.status(401);
//     throw new Error('Unauthorized, admin access required');
//   }
// };

// // Grant access to agent routes
// const agent = (req, res, next) => {
//   if (req.user && req.user.isAgent) {
//     next();
//   } else {
//     res.status(401);
//     throw new Error('Unauthorized, agent access required');
//   }
// };

// export {
//   protect,
//   admin,
//   agent
// };








import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

// Protect routes with JWT authentication middleware
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Get the authorization header or cookie
  const authHeader = req.headers.authorization || req.headers.Authorization || '';

  // Check for token in cookies or Authorization header
  token = req.cookies?.jwt || (authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null);

  if (token) {
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token and exclude the password
      req.user = await User.findById(decoded.userId).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Invalid token');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, token is missing');
  }
});

// Grant access to admin-only routes
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403);  // Use 403 for forbidden access
    throw new Error('Admin access required');
  }
};

// Grant access to agent-only routes
const agent = (req, res, next) => {
  if (req.user && req.user.isAgent) {
    next();
  } else {
    res.status(403);  // Use 403 for forbidden access
    throw new Error('Agent access required');
  }
};

// Grant access to both admin and agent
const adminOrAgent = (req, res, next) => {
  if (req.user && (req.user.isAdmin || req.user.isAgent)) {
    next();
  } else {
    res.status(403);  // Use 403 for forbidden access
    throw new Error('Admin or Agent access required');
  }
};

export {
  protect,
  admin,
  agent,
  adminOrAgent
};




// Grant access to agent routes
// const agent = (req, res, next) => {
    
//     if (req.user && req.user.isAgent) {
//         next();
//     } else {
//         res.status(401);
//         throw new Error('Unauthorized, agent access required');
//     }
// };