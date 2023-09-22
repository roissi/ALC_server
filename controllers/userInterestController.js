import sequelize from '../data/database.js';
import UserInterest from '../models/UserInterest.js';
import { ValidationError } from '../errors/customErrors.js';

export const getUserInterests = async (req, res) => {
  try {
    const userId = req.userId;
    const userInterests = await UserInterest.findAll({ where: { user_id: userId } });
    res.status(200).json(userInterests);
  } catch (error) {
    console.error('Erreur lors de la récupération des intérêts de l\'utilisateur:', error);
    res.status(500).json({ error: 'Erreur du serveur' });
  }
};

export const createUserInterest = async (req, res) => {
  // Démarrage de la transaction
  const t = await sequelize.transaction();

  try {
    // Extraire userId depuis req.user (ajouté par le middleware JWT)
    const userId = req.userId;

    // Valider l'existence de userId et qu'il soit un entier
    if (!userId || isNaN(parseInt(userId, 10))) {
      throw new ValidationError("userId est nécessaire et doit être un entier.");
    }

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

    // Boucle sur les intérêts pour les créer dans la base de données
    for (const interest_id of interests) {
      const integerInterestId = parseInt(interest_id, 10);
      if (isNaN(integerInterestId)) {
        throw new ValidationError("Tous les interest_id doivent être des entiers.");
      }

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

export const updateUserInterests = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const userId = req.userId;
    const { interests, needsWithDuration } = req.body;

    if (needsWithDuration.length > 1) {
      throw new ValidationError("Un seul besoin est autorisé à la fois.");
    }

    // Supprime les anciens intérêts et besoins
    const deleteResult = await UserInterest.destroy({ where: { user_id: userId } }, { transaction: t });

    // Ajoute les nouveaux intérêts
    for (const interest_id of interests) {
      const integerInterestId = parseInt(interest_id, 10);
      const createResult = await UserInterest.create({
        user_id: userId,
        interest_id: integerInterestId,
        is_permanent: true,
      }, { transaction: t });
    }

    // Ajoute le dernier besoin avec durée
    const lastNeedWithDuration = needsWithDuration[needsWithDuration.length - 1];
    const { need, duration } = lastNeedWithDuration;
    const integerNeedId = parseInt(need, 10);
    const createNeedResult = await UserInterest.create({
      user_id: userId,
      interest_id: integerNeedId,
      is_permanent: false,
      duration,
    }, { transaction: t });

    await t.commit();
    res.status(200).json({ message: 'Mise à jour réussie.' });

  } catch (error) {
    await t.rollback();
    console.error('Erreur lors de la mise à jour des intérêts de l\'utilisateur:', error);
    res.status(500).json({ error: 'Erreur du serveur' });
  }
};

export const deleteUserInterests = async (req, res) => {
  try {
    const userId = req.userId;

    await UserInterest.destroy({ where: { user_id: userId } });
    res.status(200).json({ message: 'Suppression réussie.' });

  } catch (error) {
    console.error('Erreur lors de la suppression des intérêts de l\'utilisateur:', error);
    res.status(500).json({ error: 'Erreur du serveur' });
  }
};