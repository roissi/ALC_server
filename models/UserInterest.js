import { DataTypes, Model } from 'sequelize';
import sequelize from '../data/database.js';

class UserInterest extends Model {}

UserInterest.init({
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users', 
      key: 'id'
    },
    primaryKey: true
  },
  interest_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'interests', 
      key: 'id'
    },
    primaryKey: true
  },
  is_permanent: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  duration: DataTypes.INTEGER 
}, {
  sequelize,
  modelName: 'user_interest',
  timestamps: true,
  underscored: true
});

UserInterest.associate = function(models) {
  UserInterest.belongsTo(models.User, {
    foreignKey: 'user_id'
  });
  
  UserInterest.belongsTo(models.Interest, {
    foreignKey: 'interest_id'
  });
};

export default UserInterest;