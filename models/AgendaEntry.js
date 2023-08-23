import { DataTypes, Model } from 'sequelize';
import sequelize from '../data/database.js';

class AgendaEntry extends Model {}

AgendaEntry.init({
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users', 
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: DataTypes.TEXT,
  start_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  end_time: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'agenda_entry',
  timestamps: true,
  underscored: true
});

AgendaEntry.associate = function(models) {
  AgendaEntry.belongsTo(models.User, {
    foreignKey: 'user_id'
  });
};

export default AgendaEntry;