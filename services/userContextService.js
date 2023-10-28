import { UserInterest } from "../models/UserInterest.js";
import { Interest } from "../models/Interest.js";

export const getUserInterests = async (userId) => {
  const interests = await UserInterest.findAll({
    where: { user_id: userId },
    logging: console.log,
    include: {
      model: Interest,
      where: { type: "Interest" },
    },
  });
  return interests
    .map((interest) => {
      if (
        interest.interest &&
        interest.interest.dataValues &&
        interest.interest.dataValues.name
      ) {
        return interest.interest.dataValues.name;
      } else {
        return null;
      }
    })
    .filter((name) => name !== null);
};

export const getUserNeeds = async (userId) => {
  const needs = await UserInterest.findAll({
    where: { user_id: userId },
    include: {
      model: Interest,
      where: { type: "Need" },
    },
  });
  return needs
    .map((need) => {
      if (
        need.interest &&
        need.interest.dataValues &&
        need.interest.dataValues.name
      ) {
        return need.interest.dataValues.name;
      } else {
        return null;
      }
    })
    .filter((name) => name !== null);
};

export const createOpenAIPromptWithContext = (promptText, interests, needs) => {
  const fullPrompt = `User requests: '${promptText}'. In 150 characters or less, including spaces, suggest an activity for someone who is also interested in ${interests.join(
    " et ",
  )} and currently needs ${needs[0]}`;
  return fullPrompt;
};
