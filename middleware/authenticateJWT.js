import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { AuthenticationError } from '../errors/customErrors.js';

export const authenticateJWT = async (req, res, next) => {
  const authHeader = req.header('Authorization');

  console.log("Received Authorization Header:", authHeader);

  if (!authHeader) {
    return next(new AuthenticationError('Access Denied'));
  }
  if (!authHeader.startsWith("Bearer ")) {
    return next(new AuthenticationError('Invalid authorization format. Expected "Bearer <token>"'));
  }

  const token = authHeader.split(' ')[1];
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ where: { id: verified.userId } });

    if (!user) {
      return next(new AuthenticationError('User not found'));
    }
    if (user.id !== verified.userId) {
      return next(new AuthenticationError('Token does not belong to the current user'));
    }

    req.userId = verified.userId;
    
    next();
  } catch (error) {
    // Log pour imprimer l'erreur
    console.log("JWT Verification Error:", error);
    next(new AuthenticationError('Invalid Token'));
  }
};