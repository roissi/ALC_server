import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import config from './config/appConfig.js';
import router from './routes/router.js';
import { initializeDatabase, initializeModels } from './models/index.js';
import { conditionalAuthenticateJWT } from './middleware/conditionalAuthenticateJWT.js';
import { errorHandler } from './errors/errorHandler.js';

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'https://artificial-life-coach.vercel.app']
}));

app.use(express.json());

async function start() {
  console.log("Initializing database...");
  await initializeDatabase();
  console.log("Database initialized");

  console.log("Initializing models...");
  await initializeModels();
  console.log("Models initialized");
}
start();

// Middleware de logging général
app.use((req, res, next) => {
  console.log('Une requête a été reçue');
  console.log('URL:', req.url);
  console.log('Méthode:', req.method);
  next();
});

app.use(conditionalAuthenticateJWT);
app.use('/', router);

app.use(errorHandler);

// N'écoutez sur un port que si nous ne sommes pas dans un environnement de test
const PORT = process.env.PORT || config.PORT || 4500;  // Modification ici
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {  // Et ici
    console.log(`Serveur écoutant sur le port ${PORT}`);  // Et ici
  });
}

export default app;
