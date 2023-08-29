import { Sequelize } from 'sequelize';
import configFile from '../config/dbConfig.js';

const env = process.env.NODE_ENV || 'development';
const config = configFile[env];

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données établie avec succès.');
  } catch (err) {
    console.error('Impossible de se connecter à la base de données:', err);
    process.exit(1); // Arrête l'exécution du programme
  }
}

initializeDatabase();

export default sequelize;