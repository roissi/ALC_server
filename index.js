import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import config from './config/appConfig.js';
import router from './routes/router.js';
import authRoutes from './routes/authRoutes.js'; // Importer les routes d'authentification
import { conditionalAuthenticateJWT } from './middleware/conditionalAuthenticateJWT.js';
import { AuthenticationError } from './errors/customErrors.js'; // Importer la classe d'erreur personnalisée

const jwtSecret = process.env.JWT_SECRET;
console.log('JWT_SECRET:', jwtSecret);

const app = express();

app.use(cors({
  origin: 'http://localhost:3000' // Permet uniquement les requêtes provenant de cette origine
}));

app.use(express.json()); // middleware pour parser les requêtes JSON
app.use(conditionalAuthenticateJWT);
app.use('/', router);
app.use(authRoutes); // Ajouter les routes d'authentification à l'application

// Middleware pour gérer les erreurs d'authentification
app.use((err, req, res, next) => {
  if (err instanceof AuthenticationError) {
    return res.status(401).json({ error: err.message });
  }
  // Gérer d'autres types d'erreurs
  next(err); // Passer à d'autres gestionnaires d'erreur si besoin
});

// Middleware pour gérer les erreurs inattendues
app.use((err, req, res, next) => {
  // Logique de gestion des erreurs inattendues (vous pouvez logger l'erreur ici)
  return res.status(500).json({ error: 'Une erreur interne s\'est produite' });
});

app.listen(config.PORT, () => {
  console.log(`Serveur écoutant sur le port ${config.PORT}`);
});

export default app;