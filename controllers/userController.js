import { User } from '../models/User.js';
import { ValidationError } from '../errors/customErrors.js';
import Sequelize from 'sequelize';

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
        const { username, password, email } = req.body;
        const user = await User.create({ username, password, email });

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
            throw new ValidationError('Utilisateur non trouvé');
        }
        user.set(req.body);
        await user.save();

        return res.status(200).json({ user: user });
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
        if (error instanceof ValidationError) {
            next(error);
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
            return res.status(204).json({ message: 'Utilisateur supprimé' });
        }
        throw new ValidationError('Utilisateur non trouvé');
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur:', error);
        if (error instanceof ValidationError) {
            next(error);
        } else {
            res.status(500).json({ error: 'Erreur du serveur' });
        }
    }
};