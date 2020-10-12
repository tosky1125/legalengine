'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class law_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      law_type.hasMany(models.LAW)
    }
  };
  law_type.init({
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'law_type',
  });
  return law_type;
};