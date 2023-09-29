import AgendaEntry from '../models/AgendaEntry.js';
import GPTSuggestion from '../models/GPTSuggestion.js';

export const addSuggestionToAgenda = async (req, res) => {
  try {
    // Récupérer l'ID du user et de la suggestion depuis le corps de la requête
    const { userId, suggestionId } = req.body;

    // Vérifier si userId et suggestionId ont été fournis
    if (!userId || !suggestionId) {
      return res.status(400).json({ message: "userId et suggestionId sont requis" });
    }

    // Récupérer le texte de la suggestion depuis la table `gpt_suggestions`
    const suggestion = await GPTSuggestion.findOne({ where: { id: suggestionId, user_id: userId } });
    if (!suggestion) {
      return res.status(404).json({ message: "Suggestion non trouvée" });
    }

    // Insérer une nouvelle entrée dans `agenda_entries`
    const newEntry = await AgendaEntry.create({
      user_id: userId,
      suggestion_id: suggestionId,
      title: 'Coach suggestion',
      description: suggestion.suggestion_text,
      day: req.body.day,
      hour: req.body.hour,
    });

    // Répondre avec succès
    res.status(200).json(newEntry);

  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};