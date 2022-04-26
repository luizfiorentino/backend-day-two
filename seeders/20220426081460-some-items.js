"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("todoItems", [
      {
        task: "do some grosseries",
        deadline: "the end of the week",
        todoListId: 3,
        important: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        task: "wash the car",
        deadline: "the end of the day",
        todoListId: 2,
        important: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        task: "finish the report",
        deadline: "tomorrow",
        todoListId: 4,
        important: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        task: "do the backend project",
        deadline: "thursday",
        todoListId: 4,
        important: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        task: "bring pet to the vet center",
        deadline: "the end of the week",
        todoListId: 3,
        important: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        task: "buy more medicine",
        deadline: "the end of the week",
        todoListId: 1,
        important: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("todoItems", null, {});
  },
};
