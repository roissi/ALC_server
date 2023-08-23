import express from 'express';
import * as interestController from '../controllers/interestController.js';
import { authenticateJWT } from '../middleware/authenticateJWT.js';

const router = express.Router();

router.get('/api/interests', authenticateJWT, interestController.getInterests);
router.post('/api/interests', authenticateJWT, interestController.createInterest);
router.put('/api/interests/:id', authenticateJWT, interestController.updateInterest);
router.delete('/api/interests/:id', authenticateJWT, interestController.deleteInterest);

export default router;