const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('joi');
const exceptions = require('../../exceptions')

const makedeleteCompanyData = require('./delete-company-data');

const sandbox = sinon.createSandbox();

Before(() => {
    this.companyId = undefined;
    this.result = undefined;
    this.error = undefined;
  
    sandbox.resetHistory();
  });

const companyDb = {
    getDbCompanyData:function(){},
    deleteDbCompanyData: function(){},
};

const getDbCompanyDataStub = sandbox.stub(companyDb,'getDbCompanyData');
getDbCompanyDataStub.callsFake(({companyId}) => {
    if(companyId=='78965412-12ab-4a19-8572-0cc939787b2b'){
        return [];
    }
    return [
        {
          "company_id": "18691581-12ab-4a19-8572-0cc939787b2b",
          "company_name": "RapidOps3"
        }];
});

const deleteDbCompanyDataStub = sandbox.stub(companyDb,'deleteDbCompanyData');
deleteDbCompanyDataStub.callsFake(({companyId}) => {
    return "Deleted the company succesfully"
});

function deleteAllEmployeesbyCopmany(){}
function deleteRoleForCopmany(){}

Given('Enter company id: {string} to delete a company',
    (companyId) => {
        this.companyId=(companyId) || undefined;
    },
);


When('Try to delete a company', async ()=>{
    if(this.companyId){
        this.companyId=this.companyId;
    }
    const deleteCompanyData = makedeleteCompanyData({
        Joi, 
        ValidationError:exceptions.ValidationError,
        ObjectNotFoundError:exceptions.ObjectNotFoundError,
        getDbCompanyData:companyDb.getDbCompanyData,
        deleteAllEmployeesbyCopmany,
        deleteRoleForCopmany,
        deleteDbCompanyData: companyDb.deleteDbCompanyData,
    });
    try 
    {
        this.result = await deleteCompanyData({
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


Then('Throw error: {string} with message: {string} while deleting a company', (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
});


Then('Show message: {string}', (message) => {
    expect(this.result).deep.equal(message);
});