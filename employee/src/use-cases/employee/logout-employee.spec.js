const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('joi');
const exceptions = require('../../exceptions');

const makelogoutEmployee = require('./logout-employee');

const sandbox = sinon.createSandbox();

Before(() => {
    this.sessionId = undefined;
    this.result = undefined;
    this.error = undefined;
  
    sandbox.resetHistory();
  });


const sessionDb = {
    logoutDbEmployee: function(){}
};

const logoutDbEmployeeStub = sandbox.stub(sessionDb,'logoutDbEmployee');

logoutDbEmployeeStub.callsFake(({sessionId}) => {
    return "Logged out the employee succesfully"
});



Given('Enter session id: {string} to logout an employee',
    (sessionId) => {
        this.sessionId = sessionId || undefined;
    },
);


When('Try to logout an employee', async ()=>{
    const logoutEmployee = makelogoutEmployee({
        Joi, 
        ValidationError:exceptions.ValidationError,
        logoutDbEmployee: sessionDb.logoutDbEmployee,
    });
    try 
    {
        this.result = await logoutEmployee({
            sessionId: this.sessionId
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


Then('Throw error: {string} with message: {string} while logging out an employee', (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
});


Then('Show the logout message: {string}', (message) => {
    expect(this.result).deep.equal(message);
});