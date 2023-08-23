import { DataTypes, Model } from 'sequelize';
import sequelize from '../data/database.js';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

class User extends Model {
  async isValidPassword(password) {
    return await bcrypt.compare(password, this.password);
  }
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
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  sequelize,
  modelName: 'user',
  timestamps: true,
  underscored: true,
  hooks: {
    beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
    },
    beforeUpdate: async (user) => {
        if (user.changed('password')) {
            user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
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