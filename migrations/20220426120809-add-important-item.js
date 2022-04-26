"use strict";

const { Sequelize } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      "todoItems",
      "important",
      { type: Sequelize.BOOLEAN },
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn("todoItems", "important", {});
  },
};
