'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ministry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ministry.hasMany(models.LAW)
    }
  };
  ministry.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ministry',
  });
  return ministry;
};