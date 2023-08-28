import { DataTypes, Model } from 'sequelize';
import sequelize from '../data/database.js';

const INVALID_EMAIL_MSG = 'Email format invalide';
// Vous pouvez ajouter d'autres messages d'erreur ici

class User extends Model {
}

User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
    // Vous pouvez ajouter des validateurs de complexité ici
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        args: true,
        msg: INVALID_EMAIL_MSG
      }
    }
  }
}, {
  sequelize,
  modelName: 'user',
  timestamps: true,
  underscored: true,
  hooks: {
  }
});

User.associate = function(models) {
  User.hasMany(models.UserInterest, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
  User.hasMany(models.AgendaEntry, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
  User.hasMany(models.GPTSuggestion, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
};

export default User;