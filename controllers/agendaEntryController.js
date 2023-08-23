import AgendaEntry from '../models/AgendaEntry.js';
import { ValidationError } from '../errors/customErrors.js';

export const getAgendaEntries = async (req, res) => {
    try {
        const agendaEntries = await AgendaEntry.findAll({
            where: { user_id: req.user.userId } // Filtrer par l'ID de l'utilisateur
        });
        res.json(agendaEntries);
    } catch (error) {
        console.error('Erreur lors de la récupération des entrées d\'agenda:', error);
        res.status(500).json({ error: 'Erreur du serveur' });
    }
};

export const createAgendaEntry = async (req, res) => {
    try {
        // Validation des données d'entrée
        if (!req.body.title || !req.body.date) { // Supposons que le titre et la date soient obligatoires
            throw new ValidationError('Le titre et la date sont obligatoires');
        }

        const agendaEntryData = {
            ...req.body,
            user_id: req.user.userId // Ajout de l'ID de l'utilisateur à partir de la demande
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
        // Validation des données d'entrée
        if (!req.body.title && !req.body.date) { // Vérifiez que l'une des propriétés au moins est fournie
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
        
        // Vérification de l'ID
        if (!id) {
            return res.status(400).json({ error: 'L\'ID de l\'entrée d\'agenda est requis' });
        }

        const deleted = await AgendaEntry.destroy({
            where: { id: id, user_id: req.user.userId } // Assurer que l'entrée appartient à l'utilisateur
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