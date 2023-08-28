import express from 'express';
import * as interestController from '../controllers/interestController.js';
import { authenticateJWT } from '../middleware/authenticateJWT.js';

const router = express.Router();

router.get('/', authenticateJWT, interestController.getInterests);
router.post('/', authenticateJWT, interestController.createInterest);
router.put('/:id', authenticateJWT, interestController.updateInterest);
router.delete('/:id', authenticateJWT, interestController.deleteInterest);

export default router;