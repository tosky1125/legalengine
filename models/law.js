'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LAW extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  LAW.init({
    number: DataTypes.INTEGER,
    name: DataTypes.STRING,
    promulgation_date: DataTypes.DATE,
    type: DataTypes.STRING,
    promulgation_number: DataTypes.INTEGER,
    enforcement_date: DataTypes.DATE,
    amendment_status: DataTypes.STRING,
    ministry: DataTypes.STRING,
    contexts: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'LAW',
  });
  return LAW;
};


