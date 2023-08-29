import { DataTypes, Model } from 'sequelize';
import sequelize from '../data/database.js';
import bcrypt from 'bcrypt';

const INVALID_EMAIL_MSG = 'Email format invalide';
const SALT_ROUNDS = 10;

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
    allowNull: false,
    // Ajoutez des validateurs de complexité ici, si nécessaire
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
    beforeCreate: async (user) => {
      const salt = await bcrypt.genSalt(SALT_ROUNDS);
      user.password = await bcrypt.hash(user.password, salt);
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
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