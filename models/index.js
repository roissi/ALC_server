import { Sequelize } from 'sequelize';
import configFile from '../config/dbConfig.js';

import {initializeUser } from './User.js';
import {initializeInterest } from './Interest.js';
import {initializeUserInterest } from './UserInterest.js';
import {initializeAgendaEntry } from './AgendaEntry.js';
import {initializeGPTSuggestion } from './GPTSuggestion.js';

const env = process.env.NODE_ENV || 'development';
const config = configFile[env];

let sequelize;
if (config.url) {
  sequelize = new Sequelize(config.url, {
    ...config,
    logging: console.log
  });
} else if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], {
    ...config,
    logging: console.log
  });
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    ...config,
    logging: console.log
  });
}

export async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données établie avec succès.');

    await sequelize.sync();
    console.log('Synchronisation de la base de données réussie.');

  } catch (err) {
    console.error('Impossible de se connecter à la base de données:', err);
    process.exit(1);
  }
}

const db = {};

export async function initializeModels() {
  try {
    console.log("Étape 0: Début de l'initialisation des modèles");

    // Étape 1: Initialisation des modèles
    initializeUser(sequelize, db);
    initializeInterest(sequelize, db);
    initializeUserInterest(sequelize, db);
    initializeAgendaEntry(sequelize, db);
    initializeGPTSuggestion(sequelize, db);

    // Étape 2: Association des modèles
    console.log('Étape 2: Association des modèles');
    for (const model of Object.values(db)) {
      if (model.associate) {
        console.log(`Association du modèle ${model.name}`);
        model.associate(db);
        console.log(`Modèle ${model.name} associé`);
      }
    }

    console.log("Fin de l'initialisation des modèles");

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

  } catch (error) {
    console.error('An error occurred:', error);
  }
}

export { sequelize };
