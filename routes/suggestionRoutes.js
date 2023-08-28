import express from 'express';
import * as suggestionController from '../controllers/suggestionController.js';
import { authenticateJWT } from '../middleware/authenticateJWT.js';

const router = express.Router();

router.get('/', authenticateJWT, suggestionController.getSuggestions);
router.post('/openai', authenticateJWT, suggestionController.getSuggestionFromOpenAI); // Route ajoutée ici
router.post('/', authenticateJWT, suggestionController.createSuggestion);
router.put('/:id', authenticateJWT, suggestionController.updateSuggestion);
router.delete('/:id', authenticateJWT, suggestionController.deleteSuggestion);

export default router;