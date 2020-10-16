'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Chapters', {
      chapter_id: {
        allowNull: true,
        primaryKey: true,
        type: Sequelize.STRING
      },
      law_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Laws',
          key: 'law_id'
        }
      },
      date: {
        type: Sequelize.STRING
      },
      context: {
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
    await queryInterface.dropTable('Chapters');
  }
};