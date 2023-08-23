import express from 'express';
import * as agendaEntryController from '../controllers/agendaEntryController.js';
import { authenticateJWT } from '../middleware/authenticateJWT.js';

const router = express.Router();

router.get('/api/agendaEntry', authenticateJWT, agendaEntryController.getAgendaEntries);
router.post('/api/agendaEntry', authenticateJWT, agendaEntryController.createAgendaEntry);
router.put('/api/agendaEntry/:id', authenticateJWT, agendaEntryController.updateAgendaEntry);
router.delete('/api/agendaEntry/:id', authenticateJWT, agendaEntryController.deleteAgendaEntry);

export default router;