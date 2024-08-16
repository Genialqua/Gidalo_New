import express from 'express';
const router = express.Router();
import {
  addFavouriteItems,
  getMyFavourites,
  getFavouriteById,
  getFavourites,
} from '../controllers/favouriteController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addFavouriteItems).get(protect, admin, getFavourites);
router.route('/mine').get(protect, getMyFavourites);
router.route('/:id').get(protect, getFavouriteById);


export default router;