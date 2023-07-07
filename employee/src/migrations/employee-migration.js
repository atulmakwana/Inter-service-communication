const Sequelize=require('sequelize');

module.exports = {
    up: async ({ context:queryInterface }) => {
      await queryInterface.createTable('employees', {
        employee_id: {
          type: Sequelize.UUID,
          primaryKey:true,
          defaultValue:Sequelize.literal("gen_random_uuid()")
        },
        employee_name: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        employee_email: {
          type: Sequelize.TEXT,
          allowNull: false,
          unique:true
        },
        employee_designation: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        emp_company_id:{
            type:Sequelize.UUID,
            allowNull:false
        }
      });
    },
    
    down: async (queryInterface, Sequelize) => {
      await queryInterface.sequelize.query(
        `drop table employees cascade;`
      );},
  };