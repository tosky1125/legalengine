'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Laws', {
      law_id: {
        allowNull: true,
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
      type: {
        type: Sequelize.STRING,
        allowNull: true,
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
        type: Sequelize.STRING,
        allowNull: true,
        references: {
          model: 'Ministries',
          key: 'name'
        }
      },
      context: {
        type: Sequelize.TEXT
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Laws');
  }
};