'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ministry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Ministry.hasMany(models.law)
    }
  };
  Ministry.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ministry',
  });
  return Ministry;
};