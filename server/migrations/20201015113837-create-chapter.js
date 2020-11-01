'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Chapters', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      chapter_id: {
        allowNull: true,
        type: Sequelize.STRING
      },
      chapter_id: {
        allowNull: true,
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
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Chapters');
  }
};