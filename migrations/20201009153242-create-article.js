'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('articles', {
      article_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      law_id: {
        type: Sequelize.INTEGER
      },
      chapter_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'chapters',
          key: 'chapter_id'
        }
      },
      article_title: {
        type: Sequelize.STRING
      },
      article_number: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.STRING
      },
      contexts: {
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
    await queryInterface.dropTable('articles');
  }
};