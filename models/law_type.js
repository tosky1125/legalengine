'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Law_Type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Law_Type.hasMany(models.Law, {
        foreignKey: 'type'
      })
    }
  };
  Law_Type.init({
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Law_Type',
  });
  return Law_Type;
};