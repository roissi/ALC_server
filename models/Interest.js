import { DataTypes, Model } from 'sequelize';

class Interest extends Model {}

const initializeInterest = (sequelize, db) => {
Interest.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'interest',
  tableName: 'interests',
  timestamps: true,
  underscored: true
});

Interest.associate = function(models) {
  Interest.hasMany(models.UserInterest, {
    foreignKey: 'interest_id',
    onDelete: 'CASCADE'
  });
};
db['Interest'] = Interest;
}

export { Interest, initializeInterest };