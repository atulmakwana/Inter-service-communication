const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('joi');
const ValidationError = require('../../exceptions/validation.error');
const ObjectNotFound = require('../../exceptions/object-not-found-error');

const makegetEmployeeForCompany = require('./get-employee-for-company');

const sandbox = sinon.createSandbox();

Before(() => {
    this.companyId = undefined;
    this.result = undefined;
    this.error = undefined;
  
    sandbox.resetHistory();
  });


const employeeDb = {
    getDbEmployeeForCompany: function(){}
};

const getDbEmployeeForCompanyStub = sandbox.stub(employeeDb,'getDbEmployeeForCompany');

getDbEmployeeForCompanyStub.callsFake(({companyId}) => {
    if(companyId=='4c1e7d54-b379-4524-aa02-78f3ad8d494b'){
        return [
            {
              "employee_id":"7c08cc2f-b148-4772-b062-b0859742cf7c",
              "employee_name":"Atulll",
              "employee_email":"atulmakwana4500@gmail.com",
              "employee_designation":"Intern",
              "emp_company_id":"4c1e7d54-b379-4524-aa02-78f3ad8d494b",
              "is_varified":true
            }];
    }
});



Given('Enter companyId: {string} to get all employee for a company',
    (companyId) => {
        this.companyId=(companyId) || undefined;
    },
);


When('Try to get all employee for a company', async ()=>{
    const getEgetEmployeeForCompanymployee = makegetEmployeeForCompany({
        Joi,  ValidationError,  ObjectNotFound,
        getDbEmployeeForCompany: employeeDb.getDbEmployeeForCompany,
    });
    try 
    {
        this.result = await getEgetEmployeeForCompanymployee({
          companyId: this.companyId
        });
    } 
    catch (e) {
        this.error = {
          name: e.name,
          message: e.message,
        };
    }
});


Then('Throw error: {string} with message: {string} while getting all employee for a company', (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
});


Then('Got all the employee for a company : "{string}"', (employeeDetails) => {
    expect(JSON.stringify(this.result)).deep.equal(employeeDetails);
});