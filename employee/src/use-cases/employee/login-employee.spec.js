const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('joi');
const jwt = require('jsonwebtoken')
var geoip = require('geoip-lite');
const { v1 } = require('uuid');
const exceptions = require('../../exceptions');


const makeloginEmployee = require('./login-employee');

const sandbox = sinon.createSandbox();

Before(() => {
    this.employeeEmail = undefined;
    this.ip = undefined;
    this.userAgent = undefined;
    this.result = undefined;
    this.error = undefined;
  
    sandbox.resetHistory();
  });


const sessionDb = {
    createDbSession: function(){}
};
const employeeDb = {
    getEmployeebyEmail:function(){}
}

const createDbSessionStub = sandbox.stub(sessionDb,'createDbSession');
createDbSessionStub.callsFake(({employeeEmail,ip,userAgent}) => {
    
});

const getEmployeebyEmailStub = sandbox.stub(employeeDb,'getEmployeebyEmail');
getEmployeebyEmailStub.callsFake(({employeeEmail}) => {
    if(employeeEmail=='atulmakwana123@gmail.com'){
        return []    
    }
    if(employeeEmail=='mayank1234@gmail.com'){
        return [
            {
              "employee_id":"q5d5d4cs-b148-4772-b062-b0859742cf7c",
              "employee_name":"Mayank",
              "employee_email":"atulmakwana450@gmail.com",
              "employee_designation":"Intern",
              "emp_company_id":"4c1e7d54-b379-4524-aa02-78f3ad8d494b",
              "is_varified":false
            }];   
    }
    return [
        {
          "employee_id":"7c08cc2f-b148-4772-b062-b0859742cf7c",
          "employee_name":"Atulll",
          "employee_email":"atulmakwana450@gmail.com",
          "employee_designation":"Intern",
          "emp_company_id":"4c1e7d54-b379-4524-aa02-78f3ad8d494b",
          "is_varified":true
        }];
});



Given('Enter employee email: {string}, ip:{string}, userAgent:{string} to login an employee',
    (employeeEmail,ip,userAgent) => {
        this.employeeEmail = employeeEmail || undefined;
        this.ip = ip || undefined;
        this.userAgent = userAgent || undefined;
    },
);


When('Try to login an employee', async ()=>{
    const loginEmployee = makeloginEmployee({
        Joi,
        jwt,
        geoip,
        v1,
        ValidationError:exceptions.ValidationError,
        ObjectNotFoundError:exceptions.ObjectNotFoundError,
        ForbiddenError:exceptions.ForbiddenError,
        getEmployeebyEmail:employeeDb.getEmployeebyEmail,
        createDbSession: sessionDb.createDbSession,
    });
    try 
    {
        this.result = await loginEmployee({
            employeeEmail: this.employeeEmail,
            ip:this.ip,
            userAgent:this.userAgent
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


Then('Throw error: {string} with message: {string} while logging in an employee', (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
});


Then('Show message:{string} when employee logged in', (message) => {
    expect(this.result).deep.equal(message);
});