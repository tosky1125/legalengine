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
        as: 'article',
        foreignKey: 'chapter_id',
        sourceKey: 'id'
      });

      Chapter.belongsTo(models.Law, {
        foreignKey: 'law_id',
        targetKey: 'law_id'
      });
    }
  };
  Chapter.init({
    chapter_id: {
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
    timestamps: false,
    modelName: 'Chapter',
  });
  return Chapter;
};