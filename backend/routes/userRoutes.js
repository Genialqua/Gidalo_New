import express from 'express';
const router = express.Router();
import { authUser,
    registerUser,
    logoutUser,
    getUserprofile,
    updateUserprofile,
    getUsers,
    deleteUser,
    updateUser,
    getUserById
    } from '../controllers/userController.js';

router.route('/').post(registerUser).get(getUsers);
router.route('/login').post(authUser);
router.route('/logout').post(logoutUser);
router.route('/profile').get(getUserprofile).put(updateUserprofile);
router.route('/:id').delete(deleteUser).get(getUserById).put(updateUser);

export default router;