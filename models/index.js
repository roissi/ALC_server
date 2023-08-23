import fs from 'fs';
import path from 'path';
import sequelize from '../data/database.js';
import configFile from '../config/config.js';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = configFile[env];
const db = {};

fs.readdirSync(__dirname)
  .filter(file => (
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.slice(-3) === '.js' &&
    file.indexOf('.test.js') === -1
  ))
  .forEach(file => {
    // Utilisation de require plutôt que d'import dynamique
    const modelModule = require(path.join(__dirname, file));
    const model = modelModule.default.init(sequelize, sequelize.Sequelize); // Utilisez Sequelize de l'instance sequelize
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = sequelize.Sequelize; // Utilisez Sequelize de l'instance sequelize

export default db;