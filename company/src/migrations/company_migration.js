const Sequelize=require('sequelize');

module.exports = {
    up: async ({ context:queryInterface }) => {
      await queryInterface.createTable('companies', {
        company_id: {
          type: Sequelize.UUID,
          primaryKey:true,
          defaultValue:Sequelize.literal("gen_random_uuid()")
        },
        company_name: {
          type: Sequelize.TEXT,
          allowNull: true,
          unique:true
        },
        
      });
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.sequelize.query(
        `drop table companies cascade;`
      );},
  };