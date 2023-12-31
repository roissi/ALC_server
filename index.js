import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import config from "./config/appConfig.js";
import router from "./routes/router.js";
import { initializeDatabase, initializeModels } from "./models/index.js";
import { conditionalAuthenticateJWT } from "./middleware/conditionalAuthenticateJWT.js";
import { errorHandler } from "./errors/errorHandler.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://artificial-life-coach.vercel.app",
    ],
  }),
);

app.use(express.json());

async function start() {
  await initializeDatabase();
  await initializeModels();
}
start();

// Middleware de logging général
app.use((req, res, next) => {
  next();
});

app.use(conditionalAuthenticateJWT);
app.use("/", router);

app.use(errorHandler);

const PORT = process.env.PORT || config.PORT || 4500;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Serveur écoutant sur le port ${PORT}`);
  });
}

export default app;
