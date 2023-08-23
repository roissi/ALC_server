import { DataTypes, Model } from 'sequelize';
import sequelize from '../data/database.js';

class GPTSuggestion extends Model {}

GPTSuggestion.init({
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users', 
      key: 'id'
    }
  },
  suggestion_text: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'gpt_suggestion',
  tableName: 'gpt_suggestions',
  timestamps: true,
  underscored: true
});

GPTSuggestion.associate = function(models) {
  GPTSuggestion.belongsTo(models.User, {
    foreignKey: 'user_id'
  });
};

export default GPTSuggestion;