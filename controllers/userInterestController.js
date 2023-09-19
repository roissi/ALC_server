import sequelize from '../data/database.js';
import UserInterest from '../models/UserInterest.js';
import { ValidationError } from '../errors/customErrors.js';

export const createUserInterest = async (req, res) => {
  // Démarrage de la transaction
  const t = await sequelize.transaction();

  try {
    // Extraire userId depuis req.user (ajouté par le middleware JWT)
    const userId = req.userId;
    console.log("UserId:", userId);

    // Valider l'existence de userId et qu'il soit un entier
    if (!userId || isNaN(parseInt(userId, 10))) {
      throw new ValidationError("userId est nécessaire et doit être un entier.");
    }

    console.log('Reçu dans req.body:', req.body);

    // Assurer que req.body est un objet
    if (typeof req.body !== 'object' || req.body === null) {
      throw new ValidationError("Le corps de la requête doit être un objet.");
    }

    // Extraire les intérêts et les besoins de l'utilisateur depuis req.body
    const { interests, needsWithDuration } = req.body;

    // Vérifier si les intérêts et les besoins sont des tableaux non vides
    if (!Array.isArray(interests) || interests.length === 0 || 
        !Array.isArray(needsWithDuration) || needsWithDuration.length === 0) {
      throw new ValidationError("Les tableaux d'intérêts et de besoins doivent être non vides.");
    }

    console.log("interests:", interests);  // Déplacé ici
    console.log("needsWithDuration:", needsWithDuration);  // Déplacé ici

    // Boucle sur les intérêts pour les créer dans la base de données
    for (const interest_id of interests) {
      const integerInterestId = parseInt(interest_id, 10);
      if (isNaN(integerInterestId)) {
        throw new ValidationError("Tous les interest_id doivent être des entiers.");
      }
      console.log("Converted integerInterestId:", integerInterestId);

      await UserInterest.create({
        user_id: userId,
        interest_id: integerInterestId,
        is_permanent: true,
      }, { transaction: t });
    }

    // Insertion des intérêts avec durée
    for (const { need, duration } of needsWithDuration) {
      const integerNeedId = parseInt(need, 10);
      if (isNaN(integerNeedId)) {
        throw new ValidationError("Tous les need doivent être des entiers.");
      }
      console.log("Converted integerNeedId:", integerNeedId);

      await UserInterest.create({
        user_id: userId,
        interest_id: integerNeedId,
        is_permanent: false,
        duration,
      }, { transaction: t });
    }

    // Commit de la transaction
    await t.commit();
    res.status(201).json({ message: 'Insertion réussie.' });

  } catch (error) {
    // Rollback de la transaction en cas d'erreur
    await t.rollback();

    console.error('Erreur lors de la création de la relation utilisateur-intérêt:', error);

    if (error instanceof ValidationError) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Erreur du serveur' });
    }
  }
};