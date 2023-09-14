import express from 'express';
import userRoutes from './userRoutes.js';
import suggestionRoutes from './suggestionRoutes.js';
import interestRoutes from './interestRoutes.js';
import agendaEntryRoutes from './agendaEntryRoutes.js';
import authRoutes from './authRoutes.js';

const router = express.Router();

router.use('/api/users', userRoutes);
router.use('/api/suggestion', suggestionRoutes);
router.use('/api/interests', interestRoutes);
router.use('/api/agenda-entry', agendaEntryRoutes);
router.use('/api', authRoutes);

export default router;