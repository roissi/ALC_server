import GPTSuggestion from '../models/GPTSuggestion.js';
import openaiService from '../services/openaiService.js';
import { ValidationError } from '../errors/customErrors.js';

export const getSuggestionFromOpenAI = async (req, res) => {
    try {
        const promptText = req.body.prompt;
        const suggestionText = await openaiService.getGPT4Response(promptText);

        // Créer un nouvel enregistrement dans la base de données avec la suggestion
        const suggestionData = {
            suggestion_text: suggestionText, // Correspond à la colonne "suggestion_text"
            user_id: req.user.userId // Correspond à la colonne "user_id"
        };
        const suggestion = await GPTSuggestion.create(suggestionData);

        // Renvoyer la suggestion à l'utilisateur
        res.json({ suggestion });
    } catch (error) {
        console.error('Erreur lors de l\'obtention de la suggestion:', error);
        res.status(500).json({ error: 'Erreur du serveur' });
    }
};

export const getSuggestions = async (req, res) => {
    try {
        const suggestions = await GPTSuggestion.findAll({
            where: { user_id: req.user.userId } // Filtrer par l'ID de l'utilisateur
        });
        res.json(suggestions);
    } catch (error) {
        console.error('Erreur lors de la récupération des suggestions:', error);
        res.status(500).json({ error: 'Erreur du serveur' });
    }
};

export const createSuggestion = async (req, res) => {
    try {
        const suggestionData = {
            ...req.body,
            user_id: req.user.userId // Ajout de l'ID de l'utilisateur à partir de la demande
        };
        const suggestion = await GPTSuggestion.create(suggestionData);
        res.status(201).json(suggestion);
    } catch (error) {
        console.error('Erreur lors de la création de la suggestion:', error);
        res.status(500).json({ error: 'Erreur du serveur' });
    }
};

export const updateSuggestion = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await GPTSuggestion.update(req.body, {
            where: { id: id }
        });

        if (updated) {
            const updatedSuggestion = await GPTSuggestion.findOne({ where: { id: id } });
            return res.status(200).json({ suggestion: updatedSuggestion });
        }

        throw new ValidationError('Suggestion non trouvée'); // Utiliser l'erreur personnalisée
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la suggestion:', error);
        res.status(500).json({ error: 'Erreur du serveur' });
    }
};

export const deleteSuggestion = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await GPTSuggestion.destroy({
            where: { id: id }
        });

        if (deleted) {
            return res.status(204).send("Suggestion supprimée");
        }

        throw new ValidationError('Suggestion non trouvée'); // Utiliser l'erreur personnalisée
    } catch (error) {
        console.error('Erreur lors de la suppression de la suggestion:', error);
        res.status(500).json({ error: 'Erreur du serveur' });
    }
};