'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class revision extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  revision.init({
    old_law_id: DataTypes.INTEGER,
    new_law_id: DataTypes.INTEGER,
    statement: DataTypes.TEXT,
    reason: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'revision',
  });
  return revision;
};