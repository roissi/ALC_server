import express from 'express';
import * as userInterestController from '../controllers/userInterestController.js';

const router = express.Router();

router.post('/', userInterestController.createUserInterest);
// Vous pouvez également ajouter des routes pour la mise à jour, la suppression, etc., si nécessaire

export default router;