'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('packages', [
      {
        nama_paket: 'Cuci saja(per Kg)',
        harga: 5000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama_paket: 'Setrika saja(per Kg)',
        harga: 6000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama_paket: 'Cuci + Setrika(per Kg)',
        harga: 7000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('packages', null, {});
  },
};
