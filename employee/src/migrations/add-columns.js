const Sequelize=require('sequelize');

module.exports = {
    up: async ({ context:queryInterface }) => {
      await queryInterface.sequelize.query(
        `ALTER TABLE employees ADD COLUMN is_varified BOOLEAN default(BOOLEAN 'FALSE');`
      );
      await queryInterface.sequelize.query(
        `ALTER TABLE employees ADD COLUMN password STRING NOT NULL;`
      );
    },
    
    down: async (queryInterface, Sequelize) => {
      await queryInterface.sequelize.query(
        `alter table employees drop column is_varified;`
      );
      await queryInterface.sequelize.query(
        `alter table employees drop column password;`
      );
    },
  };