import { ValidationError, AuthenticationError } from './customErrors.js';
import { UniqueConstraintError } from 'sequelize';


export const errorHandler = (err, req, res, next) => {
    if (err instanceof ValidationError) {
      return res.status(400).json({ error: err.message });
    }
  
    if (err instanceof AuthenticationError) {
      return res.status(401).json({ error: err.message });
    }

    if (err instanceof UniqueConstraintError) {
      return res.status(409).json({ error: 'Les données envoyées violent une contrainte d\'unicité' });
    }
  
      return res.status(500).json({ error: 'Une erreur du serveur est survenue' });
  };