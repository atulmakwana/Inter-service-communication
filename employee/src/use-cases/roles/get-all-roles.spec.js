const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
const sinon = require('sinon');
const sandbox = sinon.createSandbox();
const expect = require('chai').expect;
const Joi = require('joi');

Before(() => {
  this.result = undefined;
  this.error = undefined;

  sandbox.resetHistory();
});

const roleDb = {
    getAllDbRole:()=>{}
};

const makegetAllRole = require('./get-all-roles');

const getAllDbRoleStub = sandbox.stub(roleDb,"getAllDbRole");
getAllDbRoleStub.callsFake(()=>{
  return [{
        "role_id": "93da2cda-e255-49b4-a001-dc7eb938786e",
        "company_id": "4c1e7d54-b379-4524-aa02-78f3ad8d494b",
        "name": "role222",
        "permission": "{\"session.read\":true}",
        "is_master": true
    }]
});

Given('Get all the roles.',
  () => {}
);

When('Try to get all roles.', async () => {
  try {
    const getAllRole =  makegetAllRole({ 
        getDbAllRole:roleDb.getAllDbRole,
    });
    this.result = await getAllRole();
  } 
  catch (e) {
    this.error = e;
  }
});

Then('It will give roles list: "{string}"', (roleDetails) => {
   expect(JSON.stringify(this.result)).deep.equal(roleDetails); 
});


Then('getAllRole function is called {int} time', (count) => {
    sinon.assert.callCount(getAllDbRoleStub, count)
});  