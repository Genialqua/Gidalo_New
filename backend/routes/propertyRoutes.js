import express from 'express';
const router = express.Router();
import { getProperties, getPropertyById } from '../controllers/propertyController.js';

router.route('/').get(getProperties);
router.route('/:id').get(getPropertyById);

export default router;
