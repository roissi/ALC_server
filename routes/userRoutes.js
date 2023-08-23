import express from 'express';
import * as userController from '../controllers/userController.js';
import { authenticateJWT } from '../middleware/authenticateJWT.js';

const router = express.Router();

router.get('/api/users', authenticateJWT, userController.getUsers);
router.post('/api/users', authenticateJWT, userController.createUser);
router.put('/api/users/:id', authenticateJWT, userController.updateUser);
router.delete('/api/users/:id', authenticateJWT, userController.deleteUser);

export default router;