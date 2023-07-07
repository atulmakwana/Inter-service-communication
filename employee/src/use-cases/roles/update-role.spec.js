const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('joi');
const exceptions = require('../../exceptions');

const makeupdateRole = require('./update-role');

const sandbox = sinon.createSandbox();

Before(() => {
    this.roleId = undefined;
    this.name=undefined;
    this.permissions=undefined;
    this.result = undefined;
    this.error = undefined;
  
    sandbox.resetHistory();
});

const roleDb = {
    getDbRoleById: function(){},
    updateDbRole: function(){},
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
        role_id: '19dae2f0-101f-11ee-9cd5-b387fd628ab1',
        company_id: '4c1e7d54-b379-4524-aa02-78f3ad8d494b',
        name: 'sessionRead',
        permission: '{"session.get":true,"session.update":true}',
        is_master: false
      }];
});



const updateDbRoleStub = sandbox.stub(roleDb,'updateDbRole');
updateDbRoleStub.callsFake((args) => {
    return [{
        role_id: "19dae2f0-101f-11ee-9cd5-b387fd628ab1",
        company_id: "4c1e7d54-b379-4524-aa02-78f3ad8d494b",
        name: "sessionRW",
        permission: `{"session.get":true,"session.update":true,"session.write":true}`,
        is_master: false
      }];
});


Given('Role id: {string}, name: {string} and permissions: "{string}"',
    (roleId,name,permissions) => {
        this.roleId=roleId || undefined;
        this.name=name || undefined;
        this.permissions=permissions || undefined;
    },
);

When('Try to update a role', async ()=>{
    const updateRole = makeupdateRole({
        Joi, 
        ValidationError:exceptions.ValidationError,
        ObjectNotFoundError:exceptions.ObjectNotFoundError,
        getDbRoleById:roleDb.getDbRoleById,
        updateDbRole:roleDb.updateDbRole,
    });
    try 
    {
        this.result = await updateRole({
            roleId:this.roleId,
            name:this.name,
            permissions:this.permissions
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


Then('Throw error: {string} with message: {string} while updating a role', (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
});


Then('Show response: "{string}" while updating role', (response) => {
    expect(JSON.stringify(this.result)).deep.equal(response);
});
