import { sequelize } from '../models/index.js';
import { UserInterest } from '../models/UserInterest.js';
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
  const t = await sequelize.transaction();
  try {
    const userId = req.userId;

    if (!userId || isNaN(parseInt(userId, 10))) {
      throw new ValidationError("userId est nécessaire et doit être un entier.");
    }

    if (typeof req.body !== 'object' || req.body === null) {
      throw new ValidationError("Le corps de la requête doit être un objet.");
    }

    const { interests, needsWithDuration } = req.body;

    if (!Array.isArray(interests) || interests.length === 0 || 
        !Array.isArray(needsWithDuration) || needsWithDuration.length === 0) {
      throw new ValidationError("Les tableaux d'intérêts et de besoins doivent être non vides.");
    }

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

    await t.commit();
    res.status(201).json({ message: 'Insertion réussie.' });

  } catch (error) {
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

    const deleteResult = await UserInterest.destroy({ where: { user_id: userId } }, { transaction: t });

    for (const interest_id of interests) {
      const integerInterestId = parseInt(interest_id, 10);
      const createResult = await UserInterest.create({
        user_id: userId,
        interest_id: integerInterestId,
        is_permanent: true,
      }, { transaction: t });
    }

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