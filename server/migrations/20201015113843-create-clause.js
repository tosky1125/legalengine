'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Clauses', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      clause_id: {
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
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Articles',
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
    await queryInterface.dropTable('Clauses');
  }
};