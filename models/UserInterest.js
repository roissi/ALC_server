import { DataTypes, Model } from 'sequelize';

class UserInterest extends Model {}

const initializeUserInterest = (sequelize, db) => {
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
  tableName: 'user_interests',
  timestamps: true,
  underscored: true
});

UserInterest.associate = function(models) {
  console.log("Models in UserInterest:", models);
  UserInterest.belongsTo(models.User, {
    foreignKey: 'user_id'
  });
  
  UserInterest.belongsTo(models.Interest, {
    foreignKey: 'interest_id'
  });
};
db['UserInterest'] = UserInterest;
}

export { UserInterest, initializeUserInterest };