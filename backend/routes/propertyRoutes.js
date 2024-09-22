import express from 'express';
const router = express.Router();
import { getProperties, 
        getPropertyById,
        createProperty,
        updateProperty,
        deleteproperty,
        createPropertyReview,
        getTopProperties,
        getPropertiesByUser,

        } from '../controllers/propertyController.js';
import { protect, admin, agent } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

router.route('/').get(getProperties).post(protect, admin, agent, createProperty);
router.route('/category/:category').get(getProperties);
router.route('/:id/reviews').post(protect, checkObjectId, createPropertyReview);
router.get('/top', getTopProperties);
router.get('/user/:userId', getPropertiesByUser);

router
  .route('/:id')
  .get(getPropertyById)
  .put(protect, admin, agent, checkObjectId, updateProperty)
  .delete(protect, admin, checkObjectId, deleteproperty);

export default router;
