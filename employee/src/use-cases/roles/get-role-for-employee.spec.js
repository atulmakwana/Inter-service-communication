const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('joi');
const exceptions = require('../../exceptions');

const makeGetRoleForEmployee = require('./get-role-for-employee');

const sandbox = sinon.createSandbox();

Before(() => {
    this.employeeId = undefined;
    this.result = undefined;
    this.error = undefined;
  
    sandbox.resetHistory();
  });


const roleDb = {
    getDbRoleForEmployee: function(){}
};

const getDbRoleForEmployeeStub = sandbox.stub(roleDb,'getDbRoleForEmployee');
getDbRoleForEmployeeStub.callsFake(({employeeId}) => {
    if(employeeId=='d59c8758-d4db-4fb8-a4ce-f1d81c6516d5'){
        return []   
   }
    return 'success'
});



Given('Enter employeeId: {string} to get all roles of an employee',
    (employeeId) => {
        this.employeeId=(employeeId) || undefined;
    },
);


When('Try to get all roles of an employee', async ()=>{
    const getRoleForEmployee = makeGetRoleForEmployee({
        Joi, 
        ValidationError:exceptions.ValidationError,
        getDbRoleForEmployee: roleDb.getDbRoleForEmployee,
    });
    try 
    {
        this.result = await getRoleForEmployee({
          employeeId: this.employeeId
        });
    } 
    catch (e) {
        this.error = {
          name: e.name,
          message: e.message,
        };
    }
});


Then('Throw error: {string} with message: {string} while getting all roles of an employee', (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
});


Then('Got all the roles of employee: {string}', (roleDetail) => {
    expect(this.result).deep.equal(roleDetail);
});