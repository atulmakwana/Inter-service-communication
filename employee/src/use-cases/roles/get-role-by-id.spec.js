const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('joi');
const exceptions = require('../../exceptions');

const makegetroleById = require('./get-role-by-id');

const sandbox = sinon.createSandbox();

Before(() => {
    this.roleId = undefined;
    this.result = undefined;
    this.error = undefined;
  
    sandbox.resetHistory();
  });


const roleDb = {
    getDbRoleById: function(){}
};

const getDbRoleByIdStub = sandbox.stub(roleDb,'getDbRoleById');

getDbRoleByIdStub.callsFake(({roleId}) => {
    if(roleId=='d59c8758-d4db-4fb8-a4ce-f1d81c6516d5'){
        return []   
   }
    return [
        {
          "employee_id":"7c08cc2f-b148-4772-b062-b0859742cf7c",
          "employee_name":"Atulll",
          "employee_email":"atulmakwana4500@gmail.com",
          "employee_designation":"Intern",
          "emp_company_id":"4c1e7d54-b379-4524-aa02-78f3ad8d494b",
          "is_varified":true
        }];
});



Given('Enter roleId: {string} to get a role',
    (roleId) => {
        this.roleId=(roleId) || undefined;
    },
);


When('Try to get a role', async ()=>{
    const getRoleById = makegetroleById({
        Joi, 
        ValidationError:exceptions.ValidationError,
        getDbRoleById: roleDb.getDbRoleById,
    });
    try 
    {
        this.result = await getRoleById({
          roleId: this.roleId
        });
    } 
    catch (e) {
        this.error = {
          name: e.name,
          message: e.message,
        };
    }
});


Then('Throw error: {string} with message: {string} while getting a role', (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
});


Then('Got the role: "{string}"', (roleDetail) => {
    expect(JSON.stringify(this.result)).deep.equal(roleDetail);
});