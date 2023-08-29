import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import config from './config/appConfig.js';
import router from './routes/router.js';
import authRoutes from './routes/authRoutes.js';
import { conditionalAuthenticateJWT } from './middleware/conditionalAuthenticateJWT.js';
import { errorHandler } from './errors/errorHandler.js';

const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use(conditionalAuthenticateJWT);
app.use('/', router);
app.use(authRoutes);

app.use(errorHandler);

// N'écoutez sur un port que si nous ne sommes pas dans un environnement de test
if (process.env.NODE_ENV !== 'test') {
  app.listen(config.PORT, () => {
    console.log(`Serveur écoutant sur le port ${config.PORT}`);
  });
}

export default app;