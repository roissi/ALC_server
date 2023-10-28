import { DataTypes, Model } from "sequelize";

class AgendaEntry extends Model {}

const initializeAgendaEntry = (sequelize, db) => {
  AgendaEntry.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      suggestion_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "gpt_suggestions",
          key: "id",
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: DataTypes.TEXT,
      day: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hour: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "agenda_entry",
      timestamps: true,
      underscored: true,
    },
  );

  AgendaEntry.associate = function (models) {
    AgendaEntry.belongsTo(models.User, {
      foreignKey: "user_id",
    });
    AgendaEntry.belongsTo(models.GPTSuggestion, {
      foreignKey: "suggestion_id",
    });
  };
  db["AgendaEntry"] = AgendaEntry;
};

export { AgendaEntry, initializeAgendaEntry };
