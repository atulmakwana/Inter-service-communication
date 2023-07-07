const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('joi');
const ValidationError = require('../../exceptions/validation.error');

const makegetEmployeebyEmail = require('./get-employee-by-email');

const sandbox = sinon.createSandbox();

Before(() => {
    this.employeeEmail = undefined;
    this.result = undefined;
    this.error = undefined;
  
    sandbox.resetHistory();
  });


const employeeDb = {
    getDbEmployeebyEmail: function(){}
};

const getDbEmployeebyEmailStub = sandbox.stub(employeeDb,'getDbEmployeebyEmail');

getDbEmployeebyEmailStub.callsFake(({employeeEmail}) => {
    if(employeeEmail=='atulmakwana123@gmail.com'){
        throw new Error("No such employee is there, you are trying to get...");
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



Given('Enter employeeEmail: {string} to get an employee by email',
    (employeeEmail) => {
        this.employeeEmail=(employeeEmail) || undefined;
    },
);


When('Try to get an employee by email', async ()=>{
    const getEmployeebyEmail = makegetEmployeebyEmail({
        Joi,  ValidationError,
        getDbEmployeebyEmail: employeeDb.getDbEmployeebyEmail,
    });
    try 
    {
        this.result = await getEmployeebyEmail({
          employeeEmail: this.employeeEmail
        });
    } 
    catch (e) {
        this.error = {
          name: e.name,
          message: e.message,
        };
    }
});


Then('Throw error: {string} with message: {string} while getting an employee by email', (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
});


Then('It will give employee by email: "{string}"', (employeeDetail) => {
    expect(JSON.stringify(this.result)).deep.equal(employeeDetail);
});