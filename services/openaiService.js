import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Récupère une réponse de GPT-4 en fonction du texte d'invite donné
 * @param {string} promptText - Le texte d'invite pour GPT-4
 * @returns {Promise<string>} La réponse de GPT-4
 */
async function getGPT4Response(enrichedPrompt) {
  try {
    const concisePrompt = `${enrichedPrompt} (Donnez une réponse complète et significative en 150 caractères maximum.)`;
    const gpt4Response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: concisePrompt,
      max_tokens: 100,
    });
    return gpt4Response.choices[0].text.trim();
  } catch (error) {
    console.error("Erreur lors de l'appel à OpenAI:", error);
    throw error;
  }
}

export default {
  getGPT4Response,
};
