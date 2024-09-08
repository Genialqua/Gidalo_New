import express from 'express';
const router = express.Router();
import { getProperties, 
        getPropertyById,
        createProperty,
        updateProperty,
        deleteproperty,
        createPropertyReview,
        getTopProperties,

        } from '../controllers/propertyController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

router.route('/').get(getProperties).post(protect, admin, createProperty);
router.route('/category/:category').get(getProperties);
router.route('/:id/reviews').post(protect, checkObjectId, createPropertyReview);
router.get('/top', getTopProperties);

router
  .route('/:id')
  .get(getPropertyById)
  .put(protect, admin, checkObjectId, updateProperty)
  .delete(protect, admin, checkObjectId, deleteproperty);

export default router;
