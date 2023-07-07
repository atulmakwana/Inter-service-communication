const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('joi');
const exceptions = require('../../exceptions');

const makeAddPermission = require('./add-permission');

const sandbox = sinon.createSandbox();

Before(() => {
    this.roleId = undefined;
    this.permissions=undefined;
    this.result = undefined;
    this.error = undefined;
  
    sandbox.resetHistory();
});


const roleDb = {
    getDbRoleById: function(){},
    addDbPermission: function(){}
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

const addDbPermissionStub = sandbox.stub(roleDb,'addDbPermission');
addDbPermissionStub.callsFake((args) => {
    return '[]';
});

Given('RoleId: {string} and permissions: "{string}"',
    (roleId,permissions) => {
        this.roleId=(roleId) || undefined;
        this.permissions=(permissions) || undefined;
    },
);

When('Try to add new permisions in existing role', async ()=>{
    const addPermission = makeAddPermission({
        Joi,
        ValidationError:exceptions.ValidationError,
        ObjectNotFoundError:exceptions.ObjectNotFoundError,
        getDbRoleById:roleDb.getDbRoleById,
        addDbPermission:roleDb.addDbPermission
    });
    try 
    {
        this.result = await addPermission({
            roleId: this.roleId,
            permissions:this.permissions,
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


Then('Throw error: {string} with message: {string} while adding permisions in a role', (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
});


Then('Show message: {string} while adding permisions in a role', (message) => {
    expect(this.result).deep.equal(message);
});