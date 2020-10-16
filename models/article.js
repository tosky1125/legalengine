'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Article.hasMany(models.Clause, {
        foreignKey: 'article_id',
        sourceKey: 'article_id'
      });
      Article.belongsTo(models.Chapter, {
        foreignKey: 'id',
        targetKey: 'chapter_id'
      });
    }
  };
  Article.init({
    article_id: {
      allowNull: true,
      type: DataTypes.STRING
    },
    law_id: DataTypes.INTEGER,
    chapter_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    article_title: DataTypes.STRING,
    date: DataTypes.STRING,
    context: DataTypes.TEXT,
    flag_pan: DataTypes.TINYINT,
    flag_yeon: DataTypes.TINYINT,
    flag_hang: DataTypes.TINYINT,
    flag_gyu: DataTypes.TINYINT
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};