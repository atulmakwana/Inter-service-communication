const Sequelize=require('sequelize');

module.exports = {
    up: async ({ context:queryInterface }) => {
      await queryInterface.createTable('sessionLogs', {
        session_id: {
          type: Sequelize.UUID,
          primaryKey:true,
          defaultValue:Sequelize.literal("gen_random_uuid()")
        },
        jwt_token: {
          type: Sequelize.STRING,
          allowNull:false,
        },
        employee_id: {
          type: Sequelize.UUID,
          allowNull: false
        },
        expiry_time: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        ip:{
          type:Sequelize.STRING,
        },
        device:{
          type:Sequelize.STRING
        },
      });
    },
    
    down: async (queryInterface, Sequelize) => {
      await queryInterface.sequelize.query(
        `drop table sessionLog cascade;`
      );},
  };