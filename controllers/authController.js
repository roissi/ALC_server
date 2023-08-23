import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { ValidationError, AuthenticationError } from '../errors/customErrors.js';

export const signUp = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { username } });

    if (existingUser) {
      throw new ValidationError('Le nom d\'utilisateur est déjà pris');
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur
    const newUser = await User.create({ username, password: hashedPassword, email });

    // Générer un token JWT
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

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

  console.log('Password from request:', password);
  console.log('Hashed password from DB:', user.password);

  try {
    // Trouver l'utilisateur dans la base de données
    const user = await User.findOne({ where: { username } });

    if (!user) {
      throw new AuthenticationError('Nom d\'utilisateur ou mot de passe incorrect');
    }

    // Vérifier le mot de passe (vous devriez stocker les mots de passe hashés dans la base de données)
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new AuthenticationError('Nom d\'utilisateur ou mot de passe incorrect');
    }

    // Générer un token JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

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