import express from 'express';
import * as suggestionController from '../controllers/suggestionController.js';

const router = express.Router();

router.get('/', suggestionController.getSuggestions);
router.post('/openai', suggestionController.getSuggestionFromOpenAI); // Route du coach !
router.post('/', suggestionController.createSuggestion);
router.put('/:id', suggestionController.updateSuggestion);
router.delete('/:id', suggestionController.deleteSuggestion);

export default router;