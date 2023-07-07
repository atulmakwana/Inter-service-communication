const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('joi');
const exceptions = require('../../exceptions');

const makegetEmployee = require('./get-employee');

const sandbox = sinon.createSandbox();

Before(() => {
    this.employeeId = undefined;
    this.result = undefined;
    this.error = undefined;
  
    sandbox.resetHistory();
  });


const employeeDb = {
    getDbEmployee: function(){}
};

const getDbEmployeeStub = sandbox.stub(employeeDb,'getDbEmployee');

getDbEmployeeStub.callsFake(({employeeId}) => {
    if(employeeId=='d59c8758-d4db-4fb8-a4ce-f1d81c6516d5'){
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



Given('Enter employeeId: {string} for get an employee',
    (employeeId) => {
        this.employeeId=(employeeId) || undefined;
    },
);


When('Try to get an employee', async ()=>{
    const getEmployee = makegetEmployee({
        Joi, 
        ValidationError:exceptions.ValidationError,
        getDbEmployee: employeeDb.getDbEmployee,
    });
    try 
    {
        this.result = await getEmployee({
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


Then('Throw error: {string} with message: {string} while getting an employee', (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
});


Then('Got the employee: "{string}"', (employeeDetail) => {
    expect(JSON.stringify(this.result)).deep.equal(employeeDetail);
});