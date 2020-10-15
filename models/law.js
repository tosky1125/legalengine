'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Law extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Law.belongsTo(models.Revision, {
        foreignKey: 'id',
        constraints: false
      });
      Law.belongsTo(models.Law_Type, {
        foreignKey: 'type',
        // targetKey: 'type',
        constraints: false
      });
      Law.belongsTo(models.Ministry, {
        foreignKey: 'ministry',
        // targetKey: 'name',
        constraints: false
      });
      Law.hasMany(models.Chapter, {
        foreignKey: 'law_id',
        sourceKey: 'law_id'
      });
    }
  };
  Law.init({
    law_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true
    },
    number: DataTypes.INTEGER,
    name: DataTypes.STRING,
    promulgation_date: DataTypes.DATE,
    type: DataTypes.STRING,
    promulgation_number: DataTypes.INTEGER,
    enforcement_date: DataTypes.DATE,
    amendment_status: DataTypes.STRING,
    ministry: DataTypes.STRING,
    context: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Law',
  });
  return Law;
};