import { DataTypes, Model } from 'sequelize';
import sequelize from '../data/database.js';

class Interest extends Model {}

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

export default Interest;