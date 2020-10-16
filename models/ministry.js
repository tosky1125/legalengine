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
      Ministry.hasMany(models.Law, {
        foreignKey: 'ministry',
        sourceKey: 'name'
      })
    }
  };
  Ministry.init({
    name: {
      primaryKey: true,
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Ministry',
  });
  Ministry.removeAttribute('id')
  return Ministry;
};