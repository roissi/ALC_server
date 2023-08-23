import express from 'express';
import userRoutes from './userRoutes.js';
import suggestionRoutes from './suggestionRoutes.js';
import interestRoutes from './interestRoutes.js';
import agendaEntryRoutes from './agendaEntryRoutes.js';

const router = express.Router();

router.use(userRoutes);
router.use(suggestionRoutes);
router.use(interestRoutes);
router.use(agendaEntryRoutes);

export default router;