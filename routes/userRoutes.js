import express from 'express';
import * as userController from '../controllers/userController.js';
import { authenticateJWT } from '../middleware/authenticateJWT.js';

const router = express.Router();

router.get('/', authenticateJWT, userController.getUsers);
router.post('/', authenticateJWT, userController.createUser);
router.put('/:id', authenticateJWT, userController.updateUser);
router.delete('/:id', authenticateJWT, userController.deleteUser);

export default router;