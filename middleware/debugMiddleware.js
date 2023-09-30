import * as suggestionToAgendaController from '../controllers/suggestionToAgendaController.js';

const router = express.Router();

// ... autres routes

// Middleware de logging
router.post('/add-suggestion', (req, res, next) => {
  console.log('Request reached /api/agenda-entry/add-suggestion');
  console.log('Request Method:', req.method);
  console.log('Request Body:', req.body);
  next();  // Passe au prochain middleware ou contrôleur
}, suggestionToAgendaController.addSuggestionToAgenda);

// ... autres routes

export default router;