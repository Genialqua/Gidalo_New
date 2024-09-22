import express from 'express';

import { 
    authUser,
    registerUser,
    logoutUser,
    getUserprofile,
    updateUserprofile,
    getUsers,
    deleteUser,
    updateUser,
    getUserById
    } from '../controllers/userController.js';
import { protect, admin, agent } from '../middleware/authMiddleware.js'

const router = express.Router();

router.route('/').post(registerUser).get(protect, admin, getUsers,agent);
router.route('/login').post(authUser);
router.route('/logout').post(logoutUser);
router.route('/profile').get(protect, getUserprofile).put(protect, updateUserprofile);
router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUser);

export default router;