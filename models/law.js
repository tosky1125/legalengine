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
      LAW.hasMany(models.CHAPTER, {
        foreignKey: 'law_id'
      })
      LAW.belongsTo(models.revision)
      LAW.belongsTo(models.law_type)
      LAW.belongsTo(models.ministry)
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


