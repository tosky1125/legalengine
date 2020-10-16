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
        targetKey: 'id'
      });
    }
  };
  Item.init({
    item_id: {
      allowNull: true,
      type: DataTypes.STRING
    },
    law_id: DataTypes.INTEGER,
    chapter_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    article_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    clause_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sub_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    date: DataTypes.STRING,
    context: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};