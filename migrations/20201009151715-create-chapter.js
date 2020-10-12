'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CHAPTERs', {
      chapter_id: {
        allowNull : false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      law_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'LAWs',
          key: 'law_id'
        }
      },
      chapter_number: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      contexts: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('CHAPTERs');
  }
};