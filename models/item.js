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
      Item.belongsTo(models.Subparagraph, {
        foreignKey: 'sub_id',
        targetKey: 'sub_id'
      });
    }
  };
  Item.init({
    item_id: {
      primaryKey: true,
      type: DataTypes.STRING
    },
    law_id: DataTypes.INTEGER,
    chapter_id: DataTypes.STRING,
    article_id: DataTypes.STRING,
    clause_id: DataTypes.STRING,
    sub_id: DataTypes.STRING,
    date: DataTypes.STRING,
    context: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};