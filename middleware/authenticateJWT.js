import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Assurez-vous que ce chemin est correct
import { AuthenticationError } from '../errors/customErrors.js';

export const authenticateJWT = async (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    // S'il n'y a pas de header d'autorisation, l'accès est refusé
    throw new AuthenticationError('Access Denied');
  }

  const token = authHeader.split(' ')[1]; // Prend le token après "Bearer "

  try {
    // Vérifie le token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    // Cherche l'utilisateur en utilisant le 'id' du token vérifié
    const user = await User.findOne({ where: { id: verified.userId } });

    if (!user) {
      // Si l'utilisateur n'est pas trouvé, lance une erreur
      throw new AuthenticationError('User not found');
    }

    // Attache l'utilisateur trouvé à req.user pour les middlewares suivants
    req.user = user;
    next();
  } catch (error) {
    // Si la vérification du token échoue, lance une erreur
    throw new AuthenticationError('Invalid Token');
  }
};