// conditionalAuthenticateJWT.js
import { authenticateJWT } from './authenticateJWT.js'; // Ajustez ce chemin selon votre structure de fichiers

export const conditionalAuthenticateJWT = (req, res, next) => {
  const publicPaths = ['/api/signup', '/api/login'];

  if (publicPaths.includes(req.path) && req.method === 'POST') {
    return next();
  }
  return authenticateJWT(req, res, next);
};