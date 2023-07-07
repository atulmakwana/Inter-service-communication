const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('joi');
const exceptions = require('../../exceptions');

const makeAssignRole = require('./assign-role');

const sandbox = sinon.createSandbox();

Before(() => {
    this.roleId = undefined;
    this.employeeId=undefined;
    this.result = undefined;
    this.error = undefined;
  
    sandbox.resetHistory();
});


const roleDb = {
    getDbRoleById: function(){},
    assignDbRole: function(){}
};

const getDbRoleByIdStub = sandbox.stub(roleDb,'getDbRoleById');
getDbRoleByIdStub.callsFake((args) => {
    expect(args).deep.equal({
        roleId: this.roleId
    });
    if(args.roleId=='98130013-3d74-4d33-bbfe-635f742c6bc9'){
        return [];
    }
    return [{
        role_id: '88130013-3d74-4d33-bbfe-635f742c6bc9',
        company_id: '4c1e7d54-b379-4524-aa02-78f3ad8d494b',
        name: 'sessionRead',
        permission: '{"session.get":true,"session.create":true,"session.delete":true,"session.filter":false,"session.search":false,"session.order":false}',
        is_master: true
      }];
});

const assignDbRoleStub = sandbox.stub(roleDb,'assignDbRole');
assignDbRoleStub.callsFake((args) => {
    return '[]';
});

Given('RoleId: {string} and EmployeeId: {string}',
    (roleId,employeeId) => {
        this.roleId=(roleId) || undefined;
        this.employeeId=(employeeId) || undefined;
    },
);

When('Try to assign role to employee', async ()=>{
    const assignRole = makeAssignRole({
        Joi, 
        ValidationError:exceptions.ValidationError,
        ObjectNotFoundError:exceptions.ObjectNotFoundError,
        getDbRoleById:roleDb.getDbRoleById,
        assignDbRole:roleDb.assignDbRole
    });
    try 
    {
        this.result = await assignRole({
            roleId: this.roleId,
            employeeId:this.employeeId,
        });
    } 
    catch (e) 
    {
        this.error = {
          name: e.name,
          message: e.message,
        };
    }
});


Then('Throw error: {string} with message: {string} while assigning a role', (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
});


Then('Show response: {string} while assigning a role', (message) => {
    expect(this.result).deep.equal(message);
});