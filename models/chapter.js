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
      Chapter.hasMany(models.Article, {
        foreignKey: 'chapter_id',
        sourceKey: 'chapter_id'
      });

      Chapter.belongsTo(models.Law, {
        foreignKey: 'law_id',
        targetKey: 'law_id'
      });
    }
  };
  Chapter.init({
    chapter_id: {
      primaryKey: true,
      allowNull: true,
      type: DataTypes.STRING
    },
    law_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    date: DataTypes.STRING,
    context: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Chapter',
  });
  return Chapter;
};