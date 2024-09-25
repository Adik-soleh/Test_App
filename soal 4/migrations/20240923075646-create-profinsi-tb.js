'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('profinsi_tbs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model:"user_tbs",
          key: "id"
        },
        onDelete : "CASCADE",
        onUpdate : "CASCADE"
      },
      nama: {
        type: Sequelize.STRING
      },
      diresmikan: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      pulau: {
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
    await queryInterface.dropTable('profinsi_tbs');
  }
};