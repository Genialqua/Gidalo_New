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
import { protect, admin, agent, adminOrAgent } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

router.route('/').get(getProperties).post(protect, adminOrAgent, createProperty);
router.route('/category/:category').get(getProperties);
router.route('/:id/reviews').post(protect, checkObjectId, createPropertyReview);
router.get('/top', getTopProperties);
router.get('/user/:userId', getPropertiesByUser);

router
  .route('/:id')
  .get(getPropertyById)
  .put(protect, adminOrAgent, checkObjectId, updateProperty)
  .delete(protect, adminOrAgent, checkObjectId, deleteproperty);

export default router;
