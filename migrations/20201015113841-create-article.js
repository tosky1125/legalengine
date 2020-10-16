'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Articles', {
      article_id: {
        allowNull: true,
        primaryKey: true,
        type: Sequelize.STRING
      },
      law_id: {
        type: Sequelize.INTEGER
      },
      chapter_id: {
        type: Sequelize.STRING,
        references: {
          model: 'Chapters',
          key: 'chapter_id'
        }
      },
      article_title: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.STRING
      },
      context: {
        type: Sequelize.TEXT
      },
      flag_pan: {
        type: Sequelize.TINYINT
      },
      flag_yeon: {
        type: Sequelize.TINYINT
      },
      flag_hang: {
        type: Sequelize.TINYINT
      },
      flag_gyu: {
        type: Sequelize.TINYINT
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
    await queryInterface.dropTable('Articles');
  }
};