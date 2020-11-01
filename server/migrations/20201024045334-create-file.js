'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Files', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      law_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Laws',
          key: 'law_id'
        }
      },
      context: {
        type: Sequelize.TEXT
      },
      hwp: {
        type: Sequelize.TEXT
      },
      pdf: {
        type: Sequelize.TEXT
      },
      date: {
        type: Sequelize.STRING
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Files');
  }
};