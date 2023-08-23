import dotenv from 'dotenv';

dotenv.config();

const appConfig = {
    PORT: process.env.PORT || 4500,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY
};

export default appConfig;