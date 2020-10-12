'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SUBPARAGRAPHs', {
      subparagraph_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      law_id: {
        type: Sequelize.INTEGER
      },
      chapter_id: {
        type: Sequelize.INTEGER
      },
      article_id: {
        type: Sequelize.INTEGER
      },
      clause_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'CLAUSEs',
          key: 'clause_id'
        }
      },
      sub_number: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('SUBPARAGRAPHs');
  }
};