import express from 'express';
import * as userInterestController from '../controllers/userInterestController.js';

const router = express.Router();

router.post('/', userInterestController.createUserInterest);
router.get('/:id', userInterestController.getUserInterests);
router.put('/:id', userInterestController.updateUserInterests);
router.delete('/:id', userInterestController.deleteUserInterests);

export default router;