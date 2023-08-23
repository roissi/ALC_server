import express from 'express';
import * as suggestionController from '../controllers/suggestionController.js';
import { authenticateJWT } from '../middleware/authenticateJWT.js';

const router = express.Router();

router.get('/api/suggestion', authenticateJWT, suggestionController.getSuggestions);
router.post('/api/suggestion/openai', authenticateJWT, suggestionController.getSuggestionFromOpenAI); // Route ajoutée ici
router.post('/api/suggestion', authenticateJWT, suggestionController.createSuggestion);
router.put('/api/suggestion/:id', authenticateJWT, suggestionController.updateSuggestion);
router.delete('/api/suggestion/:id', authenticateJWT, suggestionController.deleteSuggestion);

export default router;