'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Items', {
      item_id: {
        allowNull: true,
        primaryKey: true,
        type: Sequelize.STRING
      },
      law_id: {
        type: Sequelize.INTEGER
      },
      chapter_id: {
        type: Sequelize.STRING
      },
      article_id: {
        type: Sequelize.STRING
      },
      clause_id: {
        type: Sequelize.STRING
      },
      sub_id: {
        type: Sequelize.STRING,
        references: {
          model: 'Subparagraphs',
          key: 'sub_id'
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
    await queryInterface.dropTable('Items');
  }
};