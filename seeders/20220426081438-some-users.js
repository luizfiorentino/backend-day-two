"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("users", [
      {
        name: "Jack Bello",
        email: "jack@bello.com",
        phone: 1234567,

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Leo Messi",
        email: "leo@messi.com",
        phone: 1234567,

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Joyce Pascova",
        email: "joyce@pascova.com",
        phone: 123334455,

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Maribel Quincas",
        email: "mari@bel.com",
        phone: 1425869,

        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
