import { UserInterest } from '../models/UserInterest.js';
import { Interest } from '../models/Interest.js';

export const getUserInterests = async (userId) => {
    const interests = await UserInterest.findAll({
        where: { user_id: userId },
        include: {
            model: Interest,
            where: { type: 'interest' }
        }
    });
    return interests.map(interest => interest.Interest.name);
};

export const getUserNeeds = async (userId) => {
    const needs = await UserInterest.findAll({
        where: { user_id: userId },
        include: {
            model: Interest,
            where: { type: 'need' }
        }
    });
    return needs.map(need => need.Interest.name);
};

export const createOpenAIPromptWithContext = (promptText, interests, needs) => {
    const interestsStr = interests.join(", ");
    const needsStr = needs.join(", ");
    
    return `${promptText}\nInterests: ${interestsStr}\nNeeds: ${needsStr}`;
};