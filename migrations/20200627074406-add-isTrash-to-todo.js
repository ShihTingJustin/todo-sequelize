'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Todos', 'isTrash', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      reference: {
        model: 'Users',
        key: 'id'
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Todos', 'isTrash')
  }
};
