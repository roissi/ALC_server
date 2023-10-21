import { getUserInterests, getUserNeeds, createOpenAIPromptWithContext } from '../services/userContextService.js';
import { GPTSuggestion } from '../models/GPTSuggestion.js';
import openaiService from '../services/openaiService.js';
import { ValidationError } from '../errors/customErrors.js';

export const getSuggestionFromOpenAI = async (req, res) => {
    try {
        const userId = req.userId;
        console.log("UserID de suggestionController 1:", userId);
        const promptText = req.body.prompt;

        const interests = await getUserInterests(userId);
        const needs = await getUserNeeds(userId);

        const enrichedPrompt = createOpenAIPromptWithContext(promptText, interests, needs);
        const suggestionText = await openaiService.getGPT4Response(enrichedPrompt, userId);

        const suggestionData = {
            suggestion_text: suggestionText,
            user_id: req.userId
        };
        const suggestion = await GPTSuggestion.create(suggestionData);

        res.json({ suggestion });
    } catch (error) {
        console.error('Erreur lors de l\'obtention de la suggestion:', error);
        res.status(500).json({ error: 'Erreur du serveur' });
    }
};

export const getSuggestions = async (req, res) => {
    try {
        const suggestions = await GPTSuggestion.findAll({
            where: { user_id: req.userId }
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
            user_id: req.userId
        };
        const suggestion = await GPTSuggestion.create(suggestionData);
        res.status(201).json(suggestion);
    } catch (error) {
        console.error('Erreur lors de la création de la suggestion:', error);
        res.status(500).json({ error: 'Erreur du serveur' });
    }
};

export const markSuggestionAsAddedToAgenda = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await GPTSuggestion.update({ is_added_to_agenda: true }, {
            where: { id: id }
        });
        if (updated) {
            const markSuggestionAsAddedToAgenda = await GPTSuggestion.findOne({ where: { id: id } });
            return res.status(200).json({ suggestion: markSuggestionAsAddedToAgenda });
        }
        throw new ValidationError('Suggestion non trouvée');
    } catch (error) {
        console.error('Erreur lors du marquage de la suggestion:', error);
        res.status(500).json({ error: 'Erreur du serveur' });
    }
};

export const markSuggestionAsRemovedToAgenda = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await GPTSuggestion.update({ is_added_to_agenda: false }, {
            where: { id: id }
        });
        if (updated) {
            const markSuggestionAsRemovedToAgenda = await GPTSuggestion.findOne({ where: { id: id } });
            return res.status(200).json({ suggestion: markSuggestionAsRemovedToAgenda });
        }
        throw new ValidationError('Suggestion non trouvée');
    } catch (error) {
        console.error('Erreur lors du marquage de la suggestion:', error);
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
        throw new ValidationError('Suggestion non trouvée');
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
        throw new ValidationError('Suggestion non trouvée');
    } catch (error) {
        console.error('Erreur lors de la suppression de la suggestion:', error);
        res.status(500).json({ error: 'Erreur du serveur' });
    }
};