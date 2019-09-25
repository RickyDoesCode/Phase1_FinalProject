'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tags',
    [
      {
        name: 'Lifestyle',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Travel',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Culinary',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'DIY',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'News',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sports',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Shopping',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Games',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tags', null, {});
  }
};
