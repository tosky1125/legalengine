'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Items', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      item_id: {
        allowNull: true,
        type: Sequelize.STRING
      },
      law_id: {
        type: Sequelize.INTEGER
      },
      chapter_id: {
        type: Sequelize.STRING,
        allowNull: true
      },
      article_id: {
        type: Sequelize.STRING,
        allowNull: true
      },
      clause_id: {
        type: Sequelize.STRING,
        allowNull: true
      },
      sub_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Subparagraphs',
          key: 'id'
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
    await queryInterface.dropTable('Items');
  }
};