'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clause extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Clause.hasMany(models.Subparagraph, {
        foreignKey: 'clause_id',
        sourceKey: 'clause_id'
      });
      Clause.belongsTo(models.Article, {
        foreignKey: 'article_id',
        targetKey: 'article_id'
      });
    }
  };
  Clause.init({
    clause_id: {
      primaryKey: true,
      type: DataTypes.STRING
    },
    law_id: DataTypes.INTEGER,
    chapter_id: DataTypes.STRING,
    article_id: DataTypes.STRING,
    date: DataTypes.STRING,
    context: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Clause',
  });
  return Clause;
};