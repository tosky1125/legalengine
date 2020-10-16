'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subparagraph extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Subparagraph.hasMany(models.Item, {
        foreignKey: 'sub_id',
        sourceKey: 'id'
      });
      Subparagraph.belongsTo(models.Clause, {
        foreignKey: 'clause_id',
        targetKey: 'id'
      });
    }
  };
  Subparagraph.init({
    sub_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    law_id: DataTypes.INTEGER,
    chapter_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    article_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    clause_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    date: DataTypes.STRING,
    context: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Subparagraph',
  });
  return Subparagraph;
};