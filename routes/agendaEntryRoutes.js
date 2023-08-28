import express from 'express';
import * as agendaEntryController from '../controllers/agendaEntryController.js';
import { authenticateJWT } from '../middleware/authenticateJWT.js';

const router = express.Router();

router.get('/', authenticateJWT, agendaEntryController.getAgendaEntries);
router.post('/', authenticateJWT, agendaEntryController.createAgendaEntry);
router.put('/:id', authenticateJWT, agendaEntryController.updateAgendaEntry);
router.delete('/:id', authenticateJWT, agendaEntryController.deleteAgendaEntry);

export default router;