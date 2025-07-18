'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      /**
       * Add altering commands here.
       *
       * Example:
       * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
       */
      await queryInterface.addColumn('board', 'views', {
         type: Sequelize.INTEGER,
         allowNull: false,
         defaultValue: 0,
      })
      await queryInterface.addColumn('board', 'likes', {
         type: Sequelize.INTEGER,
         allowNull: false,
         defaultValue: 0,
      })
   },

   async down(queryInterface, Sequelize) {
      /**
       * Add reverting commands here.
       *
       * Example:
       * await queryInterface.dropTable('users');
       */
      await queryInterface.removeColumn('board', 'views')
      await queryInterface.removeColumn('board', 'likes')
   },
}
