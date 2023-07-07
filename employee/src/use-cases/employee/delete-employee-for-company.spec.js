const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('joi');
const ValidationError = require('../../exceptions/validation.error');

const makedeleteEmployeeForCompany = require('./delete-employee-for-company');

const sandbox = sinon.createSandbox();

Before(() => {
    this.companyId = undefined;
    this.result = undefined;
    this.error = undefined;
  
    sandbox.resetHistory();
});


const employeeDb = {
    deleteDbEmployeeForCompany: function(){}
};

const deleteDbEmployeeForCompanyStub = sandbox.stub(employeeDb,'deleteDbEmployeeForCompany');

deleteDbEmployeeForCompanyStub.callsFake(({copanyId}) => {
    return "Deleted the employees succesfully"
});

Given('Enter company id: {string} to delete employees for a company',
    (companyId) => {
        this.companyId=(companyId) || undefined;
    },
);

When('Try to delete employees for a company', async ()=>{
    if(this.companyId){
        this.companyId=this.companyId;
    }
    const deleteEmployeeForCompany = makedeleteEmployeeForCompany({
        Joi, 
        ValidationError,
        deleteDbEmployeeForCompany: employeeDb.deleteDbEmployeeForCompany,
    });
    try 
    {
        this.result = await deleteEmployeeForCompany({
            companyId: this.companyId
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


Then('Throw error: {string} with message: {string} while deleting employees for a company', (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
});


Then('Show message :: {string}', (message) => {
    expect(this.result).deep.equal(message);
});