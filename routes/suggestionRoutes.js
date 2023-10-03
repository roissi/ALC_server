import express from 'express';
import * as suggestionController from '../controllers/suggestionController.js';

const router = express.Router();

router.get('/', suggestionController.getSuggestions);
router.post('/openai', suggestionController.getSuggestionFromOpenAI);
router.post('/', suggestionController.createSuggestion);
router.put('/:id', suggestionController.updateSuggestion);
router.delete('/:id', suggestionController.deleteSuggestion);
router.put('/markAsAdded/:id', suggestionController.markSuggestionAsAddedToAgenda);
router.put('/markAsRemoved/:id', suggestionController.markSuggestionAsRemovedToAgenda);

export default router;