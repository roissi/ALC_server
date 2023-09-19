import Interest from '../models/Interest.js';
import { ValidationError } from '../errors/customErrors.js';

export const getInterests = async (req, res) => {
    try {
        const { type } = req.query;
        const conditions = {};

        if (type) {
            conditions.type = type;
        }

        const interests = await Interest.findAll({ where: conditions });
        res.json(interests);
    } catch (error) {
        console.error('Erreur lors de la récupération des intérêts:', error);
        res.status(500).json({ error: 'Erreur du serveur' });
    }
};

export const createInterest = async (req, res) => {
    try {
        if (!req.body.name || !req.body.type) {
            throw new ValidationError('Le nom est obligatoire');
        }
        const interest = await Interest.create(req.body);
        res.status(201).json(interest);
    } catch (error) {
        console.error('Erreur lors de la création de l\'intérêt:', error);
        if (error instanceof ValidationError) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Erreur du serveur' });
        }
    }
};

export const updateInterest = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Interest.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const updatedInterest = await Interest.findOne({ where: { id: id } });
            return res.status(200).json({ interest: updatedInterest });
        }
        throw new ValidationError('Intérêt non trouvé');
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'intérêt:', error);
        res.status(500).json({ error: 'Erreur du serveur' });
    }
};

export const deleteInterest = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Interest.destroy({
            where: { id: id }
        });
        if (deleted) {
            return res.status(204).send("Intérêt supprimé");
        }
        throw new ValidationError('Intérêt non trouvé');
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'intérêt:', error);
        res.status(500).json({ error: 'Erreur du serveur' });
    }
};