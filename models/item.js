'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.belongsTo(models.Subparagraph)
    }
  };
  Item.init({
    law_id: DataTypes.INTEGER,
    chapter_id: DataTypes.INTEGER,
    article_id: DataTypes.INTEGER,
    clause_id: DataTypes.INTEGER,
    sub_id: DataTypes.INTEGER,
    item_number: DataTypes.STRING,
    date: DataTypes.STRING,
    context: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};