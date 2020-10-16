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
        sourceKey: 'sub_id'
      });
      Subparagraph.belongsTo(models.Clause, {
        foreignKey: 'clause_id',
        targetKey: 'clause_id'
      });
    }
  };
  Subparagraph.init({
    sub_id: {
      primaryKey: true,
      type: DataTypes.STRING
    },
    law_id: DataTypes.INTEGER,
    chapter_id: DataTypes.STRING,
    article_id: DataTypes.STRING,
    clause_id: DataTypes.STRING,
    date: DataTypes.STRING,
    context: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Subparagraph',
  });
  return Subparagraph;
};