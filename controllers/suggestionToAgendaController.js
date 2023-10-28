import { AgendaEntry } from "../models/AgendaEntry.js";
import { GPTSuggestion } from "../models/GPTSuggestion.js";

export const addSuggestionToAgenda = async (req, res) => {
  try {
    const { userId, suggestionId } = req.body;

    if (!userId || !suggestionId) {
      return res
        .status(400)
        .json({ message: "userId et suggestionId sont requis" });
    }

    const suggestion = await GPTSuggestion.findOne({
      where: { id: suggestionId, user_id: userId },
    });
    if (!suggestion) {
      return res.status(404).json({ message: "Suggestion non trouvée" });
    }

    const newEntry = await AgendaEntry.create({
      user_id: userId,
      suggestion_id: suggestionId,
      title: "COACH SUGGESTION",
      description: suggestion.suggestion_text,
      day: req.body.day,
      hour: req.body.hour,
    });

    const [updated] = await GPTSuggestion.update(
      { is_added_to_agenda: true },
      {
        where: { id: suggestionId },
      },
    );

    if (!updated) {
      console.error("Échec de la mise à jour de la suggestion");
      return res
        .status(500)
        .json({ message: "Échec de la mise à jour de la suggestion" });
    }

    res.status(200).json(newEntry);
  } catch (error) {
    console.error("Erreur:", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};
