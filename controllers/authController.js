import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import {
  ValidationError,
  AuthenticationError,
} from "../errors/customErrors.js";

export const signUp = async (req, res) => {
  const { username, password, email } = req.body;
  const trimmedUsername = username.trim();
  const trimmedEmail = email.trim();

  try {
    const existingUser = await User.findOne({
      where: { username: trimmedUsername },
    });
    if (existingUser) {
      throw new ValidationError("Le nom d'utilisateur est déjà pris");
    }
    const newUser = await User.create({
      username: trimmedUsername,
      password: password.trim(),
      email: trimmedEmail,
    });
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token, userId: newUser.id });
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({ error: error.message });
    } else {
      console.error("Erreur lors de l'inscription:", error);
      res.status(500).json({ error: "Erreur du serveur" });
    }
  }
};

export const logIn = async (req, res) => {
  const { username, password } = req.body;
  const trimmedUsername = username.trim();

  try {
    const user = await User.findOne({ where: { username: trimmedUsername } });
    if (!user) {
      throw new AuthenticationError("Username ou mot de passe incorrect");
    }
    const match = await bcrypt.compare(password.trim(), user.password);
    if (!match) {
      throw new AuthenticationError("Username ou mot de passe incorrect");
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Je veux voir le token lors de la connexion
    console.log("Generated Token on LogIn:", token);

    res.json({ token, userId: user.id });
  } catch (error) {
    if (error instanceof AuthenticationError) {
      res.status(400).json({ error: error.message });
    } else {
      console.error("Erreur lors de la connexion:", error);
      res.status(500).json({ error: "Erreur du serveur" });
    }
  }
};
