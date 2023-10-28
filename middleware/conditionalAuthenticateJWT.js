import { authenticateJWT } from "./authenticateJWT.js";

export const conditionalAuthenticateJWT = (req, res, next) => {
  const publicPaths = ["/api/signup", "/api/login"];

  if (publicPaths.includes(req.path) && req.method === "POST") {
    return next();
  }

  try {
    return authenticateJWT(req, res, next);
  } catch (error) {
    console.error("Erreur d'authentification :", error);
    return res.status(401).json({ message: `Non autorisé : ${error.message}` });
  }
};
