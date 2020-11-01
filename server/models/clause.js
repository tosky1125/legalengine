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
        as: 'subPara',
        foreignKey: 'clause_id',
        sourceKey: 'id'
      });
      Clause.belongsTo(models.Article, {
        foreignKey: 'article_id',
        targetKey: 'id'
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
    timestamps: false,
    modelName: 'Clause',
  });
  return Clause;
};