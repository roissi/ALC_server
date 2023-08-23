import jwt from 'jsonwebtoken';
import { AuthenticationError } from '../errors/customErrors.js';

export const authenticateJWT = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    throw new AuthenticationError('Access Denied');
  }

  const token = authHeader.split(' ')[1]; // Prend le token après "Bearer "

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Assurez-vous que "verified" contient l'information que vous voulez attacher à req.user
    next();
  } catch (error) {
    throw new AuthenticationError('Invalid Token');
  }
};