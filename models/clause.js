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
      allowNull: true,
      type: DataTypes.STRING
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
    date: DataTypes.STRING,
    context: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Clause',
  });
  return Clause;
};