const Sequelize=require('sequelize');

module.exports = {
    up: async ({ context:queryInterface }) => {
      await queryInterface.createTable('employee_role', {
        role_id: {
          type: Sequelize.UUID,
          allowNull:false,
          primaryKey:true,
          name:'roleid_fk',
          references: {
            model:'roles',
            key:'role_id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
        employee_id: {
          type: Sequelize.UUID,
          allowNull:false,
          primaryKey:true,
          name:'employeeid_fk',
          references: {
            model:'employees',
            key:'employee_id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
      });
    },
    
    down: async (queryInterface, Sequelize) => {
      await queryInterface.sequelize.query(
        `drop table employee_role cascade;`
      );},
  };