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
      Law_Type.hasMany(models.Law, {
        as: 'Law',
        foreignKey: 'type',
        sourceKey: 'type'
      })
    }
  };
  Law_Type.init({
    type: {
      primaryKey: true,
      allowNull: true,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Law_Type',
  });
  Law_Type.removeAttribute('id')
  return Law_Type;
};