'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      File.belongsTo(models.Law, {
        foreignKey: 'law_id',
        targetKey: 'law_id'
      });
    }
  };
  File.init({
    law_id: DataTypes.INTEGER,
    context: DataTypes.STRING,
    hwp: DataTypes.STRING,
    pdf: DataTypes.STRING,
    date: DataTypes.DATE
  }, {
    sequelize,
    timestamps: false,
    modelName: 'File',
  });
  return File;
};