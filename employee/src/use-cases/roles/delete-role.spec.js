const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('joi');
const exceptions = require('../../exceptions');

const makeDeleteRole = require('./delete-role');

const sandbox = sinon.createSandbox();

Before(() => {
    this.roleId = undefined;
    this.result = undefined;
    this.error = undefined;
  
    sandbox.resetHistory();
});


const roleDb = {
    getDbRoleById: function(){},
    getDbMasterRole: function(){},
    deleteDbRole: function(){},
};

const getDbRoleByIdStub = sandbox.stub(roleDb,'getDbRoleById');
getDbRoleByIdStub.callsFake((args) => {
    expect(args).deep.equal({
        roleId: this.roleId
    });
    if(args.roleId=='98130013-3d74-4d33-bbfe-635f742c6bc9'){
        return [];
    }
    if(args.roleId=='19dae2f0-101f-11ee-9cd5-b387fd628ab1'){
        return [{
            role_id: '19dae2f0-101f-11ee-9cd5-b387fd628ab1',
            company_id: '4c1e7d54-b379-4524-aa02-78f3ad8d494b',
            name: 'sessionRead',
            permission: '{"session.get":true,"session.create":true,"session.delete":true,"session.filter":false,"session.search":false,"session.order":false}',
            is_master: true
          }];
    }
    if(this.roleId=='f685fab0-1014-11ee-8d79-57a8d370ad61'){
        return [{
            role_id: 'f685fab0-1014-11ee-8d79-57a8d370ad61',
            company_id: '4c1e7d54-b379-4524-aa02-78f3ad8d494b',
            name: 'sessionget',
            permission: '{"session.get":true}',
            is_master: true
          }];
    }
});

const getDbMasterRoleStub = sandbox.stub(roleDb,'getDbMasterRole');
getDbMasterRoleStub.callsFake(() => {
    if(this.roleId=='19dae2f0-101f-11ee-9cd5-b387fd628ab1'){
        return [{
            role_id: '19dae2f0-101f-11ee-9cd5-b387fd628ab1',
            company_id: '4c1e7d54-b379-4524-aa02-78f3ad8d494b',
            name: 'sessionRead',
            permission: '{"session.get":true,"session.create":true,"session.delete":true,"session.filter":false,"session.search":false,"session.order":false}',
            is_master: true
        }];
    }
    return [{
        role_id: '19dae2f0-101f-11ee-9cd5-b387fd628ab1',
        company_id: '4c1e7d54-b379-4524-aa02-78f3ad8d494b',
        name: 'sessionRead',
        permission: '{"session.get":true,"session.create":true,"session.delete":true,"session.filter":false,"session.search":false,"session.order":false}',
        is_master: true
        },
    {
        role_id: '88130013-3d74-4d33-bbfe-635f742c6bc9',
        company_id: '4c1e7d54-b379-4524-aa02-78f3ad8d494b',
        name: 'sessionRead',
        permission: '{"session.create":true,"session.delete":true,"session.search":false,"session.order":false}',
        is_master: true
    },
    {
        role_id: '91137513-3d74-4d33-bbfe-635f742cas75',
        company_id: '4c1e7d54-b379-4524-aa02-78f3ad8d494b',
        name: 'companyCreate',
        permission: '{"company.create":true,"session.update":true}',
        is_master: true
    }];
});

const deleteDbRoleStub = sandbox.stub(roleDb,'deleteDbRole');
deleteDbRoleStub.callsFake((args) => {
    expect(args).deep.equal({
        roleId: this.roleId
    });
    return 'Deleted the role successfull';
});


Given('Enter role Id: {string}',
    (roleId) => {
        this.roleId=(roleId) || undefined;
    },
);

When('Try to delete role', async ()=>{
    const deleteRole = makeDeleteRole({
        Joi,
        ValidationError:exceptions.ValidationError,
        ObjectNotFoundError:exceptions.ObjectNotFoundError,
        getDbRoleById:roleDb.getDbRoleById,
        getDbMasterRole:roleDb.getDbMasterRole,
        deleteDbRole:roleDb.deleteDbRole,
    });
    try 
    {
        this.result = await deleteRole({
            roleId: this.roleId
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


Then('Throw error: {string} with message: {string} while deleting a role', (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
});


Then('Show message: {string} while deleting a role', (message) => {
    expect(this.result).deep.equal(message);
});