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
      // define association here
      // Chapter.belongsTo(models.Law)
      // Chapter.hasMany(models.Article, {
      //   foreignKey: 'chapter_id'
      // })
    }
  };
  Chapter.init({
    law_id: DataTypes.INTEGER,
    chapter_number: DataTypes.STRING,
    date: DataTypes.STRING,
    context: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Chapter',
  });
  return Chapter;
};