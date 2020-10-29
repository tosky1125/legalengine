const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class LawType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      LawType.hasMany(models.Law, {
        as: 'law',
        foreignKey: 'type',
        sourceKey: 'type',
      });
    }
  }
  LawType.init({
    type: {
      primaryKey: true,
      allowNull: true,
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    timestamps: false,
    modelName: 'LawType',
  });
  LawType.removeAttribute('id');
  return LawType;
};
