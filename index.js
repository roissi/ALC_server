import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import config from './config/appConfig.js';
import router from './routes/router.js';
import authRoutes from './routes/authRoutes.js'; // Importer les routes d'authentification
import { conditionalAuthenticateJWT } from './middleware/conditionalAuthenticateJWT.js';
import { errorHandler } from './errors/errorHandler.js';

const app = express();

app.use(cors({
  origin: 'http://localhost:3000' // Permet uniquement les requêtes provenant de cette origine
}));

app.use(express.json()); // middleware pour parser les requêtes JSON
app.use(conditionalAuthenticateJWT);
app.use('/', router);
app.use(authRoutes); // Ajouter les routes d'authentification à l'application

app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`Serveur écoutant sur le port ${config.PORT}`);
});

export default app;