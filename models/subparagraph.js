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
      // define association here
      // Subparagraph.belongsTo(models.Article)
      // Subparagraph.hasMany(models.Item, {
      //   foreignKey: 'sub_id'
      // })
    }
  };
  Subparagraph.init({
    law_id: DataTypes.INTEGER,
    chapter_id: DataTypes.INTEGER,
    article_id: DataTypes.INTEGER,
    clause_id: DataTypes.INTEGER,
    sub_number: DataTypes.STRING,
    date: DataTypes.STRING,
    context: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Subparagraph',
  });
  return Subparagraph;
};