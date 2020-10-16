'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Subparagraphs', {
      sub_id: {
        allowNull: true,
        primaryKey: true,
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
        references: {
          model: 'Clauses',
          key: 'clause_id'
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
    await queryInterface.dropTable('Subparagraphs');
  }
};