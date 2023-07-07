const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('joi');
const exceptions = require('../../exceptions');

const makeverifyEmployee = require('./verify-employee');

const sandbox = sinon.createSandbox();

Before(() => {
    this.employeeId = undefined;
    this.result = undefined;
    this.error = undefined;
  
    sandbox.resetHistory();
  });


const employeeDb = {
    verifyDbEmployee: function(){}
};

const verifyDbEmployeeStub = sandbox.stub(employeeDb,'verifyDbEmployee');

verifyDbEmployeeStub.callsFake(({employeeId}) => {
    return "Verified the employee succesfully"
});



Given('Enter employee id: {string} to verify an employee',
    (employeeId) => {
        this.employeeId = employeeId || undefined;
    },
);


When('Try to verify an employee', async ()=>{
    const verifyEmployee = makeverifyEmployee({
        Joi,  
        ValidationError:exceptions.ValidationError,
        verifyDbEmployee: employeeDb.verifyDbEmployee,
    });
    try 
    {
        this.result = await verifyEmployee({
            employeeId: this.employeeId
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


Then('Throw error: {string} with message: {string} while verifing an employee', (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
});


Then('Show the verifying message: {string}', (message) => {
    expect(this.result).deep.equal(message);
});