import User from '../models/User.js';
import { ValidationError } from '../errors/customErrors.js'; // Importer la classe d'erreur personnalisée

export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        res.status(500).json({ error: 'Erreur du serveur' });
    }
};

export const createUser = async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur:', error);
        if (error instanceof Sequelize.ValidationError) {
            next(new ValidationError('Erreur de validation'));
        } else {
            res.status(500).json({ error: 'Erreur du serveur' });
        }
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ where: { id: id } });

        if (!user) {
            throw new ValidationError('Utilisateur non trouvé'); // Utiliser l'erreur personnalisée
        }

        user.set(req.body); // Met à jour les attributs de l'utilisateur
        await user.save(); // Sauvegarde l'utilisateur, déclenche le hook beforeUpdate

        return res.status(200).json({ user: user });
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
        if (error instanceof ValidationError) {
            next(error); // Passez l'erreur personnalisée au gestionnaire d'erreurs global
        } else {
            res.status(500).json({ error: 'Erreur du serveur' });
        }
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await User.destroy({
            where: { id: id }
        });

        if (deleted) {
            return res.status(204).send("Utilisateur supprimé");
        }

        throw new ValidationError('Utilisateur non trouvé'); // Utiliser l'erreur personnalisée
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur:', error);
        if (error instanceof ValidationError) {
            next(error); // Passez l'erreur personnalisée au gestionnaire d'erreurs global
        } else {
            res.status(500).json({ error: 'Erreur du serveur' });
        }
    }
};