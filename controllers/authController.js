import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { ValidationError, AuthenticationError } from '../errors/customErrors.js';


export const signUp = async (req, res) => {
  const { username, password, email } = req.body;
  const trimmedUsername = username.trim();
  const trimmedPassword = password.trim();
  const trimmedEmail = email.trim();
  
  console.log('Reçu lors de l\'inscription:', trimmedUsername, trimmedPassword, trimmedEmail);
  
  try {
    const existingUser = await User.findOne({ where: { username: trimmedUsername } });
    
    if (existingUser) {
      throw new ValidationError('Le nom d\'utilisateur est déjà pris');
    }

    
    const newUser = await User.create({ username: trimmedUsername, password: trimmedPassword, email: trimmedEmail });
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    console.log('Token généré:', token);
    res.status(201).json({ token });
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({ error: error.message });
    } else {
      console.error('Erreur lors de l\'inscription:', error);
      res.status(500).json({ error: 'Erreur du serveur' });
    }
  }
};

export const logIn = async (req, res) => {
  const { username, password } = req.body;
  const trimmedUsername = username.trim();
  const trimmedPassword = password.trim();
  
  console.log('Reçu lors de la connexion:', trimmedUsername, trimmedPassword);
  
  try {
    const user = await User.findOne({ where: { username: trimmedUsername } });
    console.log('Utilisateur depuis la DB:', user);
    
    if (!user) {
      throw new AuthenticationError('Username ou mot de passe incorrect');
    }

     if (trimmedPassword !== user.password) {
    throw new AuthenticationError('Username ou mot de passe incorrect');
  }
    
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Token généré:', token);
    res.json({ token });
  } catch (error) {
    if (error instanceof AuthenticationError) {
      res.status(400).json({ error: error.message });
    } else {
      console.error('Erreur lors de la connexion:', error);
      res.status(500).json({ error: 'Erreur du serveur' });
    }
  }
};