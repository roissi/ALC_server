import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { AuthenticationError } from '../errors/customErrors.js';

export const authenticateJWT = async (req, res, next) => {
  const authHeader = req.header('Authorization');

  // S'il n'y a pas de header d'autorisation, l'accès est refusé
  if (!authHeader) {
    return next(new AuthenticationError('Access Denied'));
  }

  // Vérifie si le header d'autorisation commence par "Bearer "
  if (!authHeader.startsWith("Bearer ")) {
    return next(new AuthenticationError('Invalid authorization format. Expected "Bearer <token>"'));
  }

  // Prend le token après "Bearer "
  const token = authHeader.split(' ')[1];

  try {
    // Vérifie le token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    // Cherche l'utilisateur en utilisant le 'id' du token vérifié
    const user = await User.findOne({ where: { id: verified.userId } });

    if (!user) {
      return next(new AuthenticationError('User not found'));
    }

    // Attache l'utilisateur trouvé à req.user pour les middlewares suivants
    req.user = user;
    next();
  } catch (error) {
    next(new AuthenticationError('Invalid Token'));
  }
};