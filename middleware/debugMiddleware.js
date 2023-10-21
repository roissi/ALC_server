import * as suggestionToAgendaController from '../controllers/suggestionToAgendaController.js';

const router = express.Router();

router.post('/add-suggestion', (req, res, next) => {
  console.log('Request reached /api/agenda-entry/add-suggestion');
  console.log('Request Method:', req.method);
  console.log('Request Body:', req.body);
  next();
}, suggestionToAgendaController.addSuggestionToAgenda);

export default router;