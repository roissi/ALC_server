import express from 'express';
import { logIn, signUp } from '../controllers/authController.js';

const router = express.Router();

router.post('/api/login', logIn);
router.post('/api/signup', signUp);

export default router;