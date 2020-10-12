'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chapter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Chapter.hasMany(models.Article, {
        foreignKey: 'chapter_id'
      })
      Chapter.belongsTo(models.Law)
    }
  };
  Chapter.init({
    chapter_id: DataTypes.INTEGER,
    law_id: DataTypes.INTEGER,
    chapter_number: DataTypes.INTEGER,
    date: DataTypes.STRING,
    contexts: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Chapter',
  });
  return Chapter;
};