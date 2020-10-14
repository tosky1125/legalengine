'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Laws', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      number: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
      },
      promulgation_date: {
        type: Sequelize.DATE
      },
      type_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Law_Types',
          key: 'id'
        }
      },
      promulgation_number: {
        type: Sequelize.INTEGER
      },
      enforcement_date: {
        type: Sequelize.DATE
      },
      amendment_status: {
        type: Sequelize.STRING
      },
      ministry_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Ministries',
          key: 'id'
        }
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
    await queryInterface.dropTable('Laws');
  }
};