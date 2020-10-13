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
        references: {
          model: 'Ministries',
          key: 'name'
        }
      },
      promulgation_date: {
        type: Sequelize.DATE
      },
      type: {
        type: Sequelize.STRING,
        references: {
          model: 'Law_Types',
          key: 'type'
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
      ministry: {
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
    await queryInterface.dropTable('Laws');
  }
};