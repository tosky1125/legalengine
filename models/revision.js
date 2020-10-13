'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Revision extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Revision.hasOne(models.Law, {
        foreignKey: 'law_id'
      })
    }
  };
  Revision.init({
    old_law_id: DataTypes.INTEGER,
    new_law_id: DataTypes.INTEGER,
    statement: DataTypes.TEXT,
    reason: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Revision',
  });
  return Revision;
};