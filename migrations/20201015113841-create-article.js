'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Articles', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      article_id: {
        allowNull: true,
        type: Sequelize.STRING
      },
      law_id: {
        type: Sequelize.INTEGER
      },
      chapter_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Chapters',
          key: 'id'
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
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Articles');
  }
};