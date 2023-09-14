import express from 'express';
import * as agendaEntryController from '../controllers/agendaEntryController.js';

const router = express.Router();

router.get('/', agendaEntryController.getAgendaEntries);
router.post('/', agendaEntryController.createAgendaEntry);
router.put('/:id', agendaEntryController.updateAgendaEntry);
router.delete('/:id', agendaEntryController.deleteAgendaEntry);

export default router;