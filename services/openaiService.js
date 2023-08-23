import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * Récupère une réponse de GPT-4 en fonction du texte d'invite donné
 * @param {string} promptText - Le texte d'invite pour GPT-4
 * @returns {Promise<string>} La réponse de GPT-4
 */
async function getGPT4Response(promptText) {
  try {
    const gpt4Response = await openai.completions.create({
      model: 'text-davinci-003',
      prompt: promptText,
      max_tokens: 150
    });
    return gpt4Response.choices[0].text.trim();
  } catch (error) {
    console.error("Erreur lors de l'appel à OpenAI:", error);
    throw error; // ou tu peux retourner une réponse d'erreur personnalisée
  }
}

export default {
  getGPT4Response
};