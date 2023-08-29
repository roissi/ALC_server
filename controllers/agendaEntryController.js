import AgendaEntry from '../models/AgendaEntry.js';
import { ValidationError } from '../errors/customErrors.js';

export const getAgendaEntries = async (req, res) => {
    try {
        const agendaEntries = await AgendaEntry.findAll({
            where: { user_id: req.user.userId }
        });
        res.json(agendaEntries);
    } catch (error) {
        console.error('Erreur lors de la récupération des entrées d\'agenda:', error);
        res.status(500).json({ error: 'Erreur du serveur' });
    }
};

export const createAgendaEntry = async (req, res) => {
    try {
        if (!req.body.title || !req.body.date) {
            throw new ValidationError('Le titre et la date sont obligatoires');
        }

        const agendaEntryData = {
            ...req.body,
            user_id: req.user.userId
        };
        const agendaEntry = await AgendaEntry.create(agendaEntryData);
        res.status(201).json(agendaEntry);
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(400).json({ error: error.message });
        } else {
            console.error('Erreur lors de la création de l\'entrée d\'agenda:', error);
            res.status(500).json({ error: 'Erreur du serveur' });
        }
    }
};

export const updateAgendaEntry = async (req, res) => {
    try {
        if (!req.body.title && !req.body.date) {
            throw new ValidationError('Au moins le titre ou la date doivent être fournis');
        }

        const { id } = req.params;
        const [updated] = await AgendaEntry.update(req.body, {
            where: { id: id, user_id: req.user.userId }
        });

        if (updated) {
            const updatedAgendaEntry = await AgendaEntry.findOne({ where: { id: id } });
            return res.status(200).json({ agendaEntry: updatedAgendaEntry });
        }

        throw new Error('Entrée d\'agenda non trouvée');
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(400).json({ error: error.message });
        } else {
            console.error('Erreur lors de la mise à jour de l\'entrée d\'agenda:', error);
            res.status(500).json({ error: 'Erreur du serveur' });
        }
    }
};

export const deleteAgendaEntry = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'L\'ID de l\'entrée d\'agenda est requis' });
        }
        const deleted = await AgendaEntry.destroy({
            where: { id: id, user_id: req.user.userId }
        });
        if (deleted) {
            return res.status(204).send("Entrée d'agenda supprimée");
        }
        throw new Error('Entrée d\'agenda non trouvée');
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'entrée d\'agenda:', error);
        res.status(500).json({ error: 'Erreur du serveur' });
    }
};