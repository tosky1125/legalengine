'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ITEM extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ITEM.belongsTo(models.SUBPARAGRAPH)
    }
  };
  ITEM.init({
    law_id: DataTypes.INTEGER,
    chapter_id: DataTypes.INTEGER,
    article_id: DataTypes.INTEGER,
    clause_id: DataTypes.INTEGER,
    subparagraph_id: DataTypes.INTEGER,
    item_number: DataTypes.INTEGER,
    date: DataTypes.STRING,
    contexts: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'ITEM',
  });
  return ITEM;
};

