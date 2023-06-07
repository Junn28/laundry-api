'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('services', [
      {
        layanan: '3 hari',
        harga: 1000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        layanan: '2 hari',
        harga: 2000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        layanan: '1 hari',
        harga: 3000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        layanan: 'Kilat(10 jam)',
        harga: 5000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
