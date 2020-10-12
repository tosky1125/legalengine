'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ARTICLE extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ARTICLE.hasMany(models.CLAUSE, {
        foreignKey: 'article_id'
      })
      ARTICLE.belongsTo(models.LAW)
    }
  };
  ARTICLE.init({
    law_id: DataTypes.INTEGER,
    chapter_id: DataTypes.INTEGER,
    article_number: DataTypes.INTEGER,
    date: DataTypes.STRING,
    contexts: DataTypes.TEXT,
    flag_pan: DataTypes.TINYINT,
    flag_yeon: DataTypes.TINYINT,
    flag_hang: DataTypes.TINYINT,
    flag_gyu: DataTypes.TINYINT
  }, {
    sequelize,
    modelName: 'ARTICLE',
  });
  return ARTICLE;
};