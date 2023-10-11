import OpenAI from 'openai';
import { getUserInterests, getUserNeeds, createOpenAIPromptWithContext } from './userContextService.js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * Récupère une réponse de GPT-4 en fonction du texte d'invite donné
 * @param {string} promptText - Le texte d'invite pour GPT-4
 * @returns {Promise<string>} La réponse de GPT-4
 */
async function getGPT4Response(userId) {
  console.log("Appel de getGPT4Response avec userId:", userId);
  try {
    const userInterests = await getUserInterests(userId);
    const userNeeds = await getUserNeeds(userId); 

    const basePrompt = "Suggérez une activité pour quelqu'un qui est intéressé par ";
    const interestPrompt = userInterests.join(' et ') + " et qui a besoin de se concentrer sur la " + userNeeds.join(' et ') + ".";

    const fullPrompt = createOpenAIPromptWithContext(basePrompt + interestPrompt, userInterests, userNeeds);

    const concisePrompt = `${fullPrompt} (Réponse en 100 caractères max.)`;
    const gpt4Response = await openai.completions.create({
      model: 'text-davinci-003',
      prompt: concisePrompt,
      max_tokens: 100
    });
    return gpt4Response.choices[0].text.trim();
  } catch (error) {
    console.error("Erreur lors de l'appel à OpenAI:", error);
    throw error;
  }
}

export default {
  getGPT4Response
};