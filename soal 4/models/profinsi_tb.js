'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class profinsi_tb extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  profinsi_tb.init({
    user_id: DataTypes.INTEGER,
    nama: DataTypes.STRING,
    diresmikan: DataTypes.STRING,
    image: DataTypes.STRING,
    pulau: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'profinsi_tb',
  });
  return profinsi_tb;
};