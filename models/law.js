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
      Law.hasMany(models.Chapter, {
        as: 'chapter',
        foreignKey: 'law_id',
        sourceKey: 'law_id',
      });
      Law.hasMany(models.File, {
        as: 'file',
        foreignKey: 'law_id',
        sourceKey: 'law_id'
      });
      Law.belongsTo(models.Revision, {
        foreignKey: 'law_id',
        targetKey: 'new_law_id',
        constraints: false
      });
      Law.belongsTo(models.Law_Type, {
        foreignKey: 'type',
        targetKey: 'type',
        constraints: false
      });
      Law.belongsTo(models.Ministry, {
        foreignKey: 'ministry',
        targetKey: 'name',
        constraints: false
      });
    }
  };
  Law.init({
    law_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    number: DataTypes.INTEGER,
    name: DataTypes.STRING,
    promulgation_date: DataTypes.DATE,
    type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    promulgation_number: DataTypes.INTEGER,
    enforcement_date: DataTypes.DATE,
    amendment_status: DataTypes.STRING,
    ministry: {
      type: DataTypes.STRING,
      allowNull: true
    },
    context: DataTypes.TEXT
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Law',
  });
  return Law;
};