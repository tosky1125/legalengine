'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Revisions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      old_law_id: {
        type: Sequelize.INTEGER
      },
      new_law_id: {
        type: Sequelize.INTEGER
      },
      statement: {
        type: Sequelize.TEXT
      },
      reason: {
        type: Sequelize.TEXT
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Revisions');
  }
};