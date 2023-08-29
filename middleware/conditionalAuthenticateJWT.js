// conditionalAuthenticateJWT.js
import { authenticateJWT } from './authenticateJWT.js';

export const conditionalAuthenticateJWT = (req, res, next) => {
  const publicPaths = ['/api/signup', '/api/login'];

  if (publicPaths.includes(req.path) && req.method === 'POST') {
    return next();
  }
  return authenticateJWT(req, res, next);
};