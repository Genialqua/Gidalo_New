import asyncHandler from '../middleware/asyncHandler.js';
import Property from '../models/propertyModel.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => { 
    const {email, password} = req.body;

    const user = await UserActivation.findOne({ email });

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    res.send('register user');
});

// @desc    Logout user & get token
// @route   POST /api/users/login
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
    res.send('logout user');
});

// @desc    Get user profile
// @route   POST /api/users/profile
// @access  private
const getUserprofile = asyncHandler(async (req, res) => {
    res.send('get user profile');
});

// @desc    update user profile
// @route   PUT /api/users/profile
// @access  private
const updateUserprofile = asyncHandler(async (req, res) => {
    res.send('update user profile');
});

// @desc    Get all user profile
// @route   GET /api/users/
// @access  private/Admin
const getUsers = asyncHandler(async (req, res) => {
    res.send('get users');
});

// @desc    Delete user profile
// @route   DELETE /api/users/profile
// @access  private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    res.send('delete user profile');
});

// @desc    Get user profile
// @route   POST /api/users/profile
// @access  private
const updateUser = asyncHandler(async (req, res) => {
    res.json('update user profile');
});

// @desc    Get user profile
// @route   POST /api/users/profile
// @access  private/Admin
const getUserById = asyncHandler(async (req, res) => {
    res.json('get single user ');
});


export{
    authUser,
    registerUser,
    logoutUser,
    getUserprofile,
    updateUserprofile,
    getUsers,
    deleteUser,
    updateUser,
    getUserById
}
