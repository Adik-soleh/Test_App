'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('kabupaten_tbs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING
      },
      provinsi_id: {
        type: Sequelize.INTEGER,
        references: {
          model:"profinsi_tbs",
          key: "id"
        },
        onDelete : "CASCADE",
        onUpdate : "CASCADE"
      },
      diresmikan: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      prov: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('kabupaten_tbs');
  }
};