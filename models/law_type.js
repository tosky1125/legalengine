'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LawType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      LawType.hasMany(models.Law)
    }
  };
  LawType.init({
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'LawType',
  });
  return LawType;
};