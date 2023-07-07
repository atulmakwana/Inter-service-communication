const Sequelize=require('sequelize');

module.exports = {
    up: async ({ context:queryInterface }) => {
      await queryInterface.createTable('roles', {
        role_id: {
          type: Sequelize.UUID,
          primaryKey:true,
          defaultValue:Sequelize.literal("gen_random_uuid()")
        },
        company_id: {
          type: Sequelize.UUID,
          allowNull:false,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        permission: {
          type: Sequelize.STRING,
          allowNull: false
        },
        is_master:{
            type:Sequelize.BOOLEAN,
            defaultValue:false,
        }
      });
    },
    
    down: async (queryInterface, Sequelize) => {
      await queryInterface.sequelize.query(
        `drop table roles cascade;`
      );},
  };