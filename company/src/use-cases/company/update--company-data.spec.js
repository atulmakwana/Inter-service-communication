const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('joi');
const exceptions = require('../../exceptions')

const makeupdateCompany = require('./update--company-data');

const sandbox = sinon.createSandbox();

Before(() => {
    this.companyId = undefined;
    this.companyName = undefined;
    this.result = undefined;
    this.error = undefined;
  
    sandbox.resetHistory();
});


const CompanyDb = {
    getDbCompanyData:function(){},
    getDbCompanybyName:function(){},
    updateDbCompanyData: function(){},
}

const getDbCompanyDataStub = sandbox.stub(CompanyDb,'getDbCompanyData');
getDbCompanyDataStub.callsFake(({companyId})=>{
    if(companyId=='78965412-12ab-4a19-8572-0cc939787b2b'){
        return [];
    }
    return [
        {
          "company_id": "18691581-12ab-4a19-8572-0cc939787b2b",
          "company_name": "RapidOps3"
        }];
});

const getDbCompanybyNameStub = sandbox.stub(CompanyDb,'getDbCompanybyName');
getDbCompanybyNameStub.callsFake(({companyName})=>{
    if(companyName=='AbcPvt'){
        return [
            {
              "company_id": "9637412-12ab-7a19-8572-0cc939787b2b",
              "company_name": "AbcPvt"
            }];
    }
    return [];
});

const updateDbCompanyDataStub = sandbox.stub(CompanyDb,'updateDbCompanyData');
updateDbCompanyDataStub.callsFake(({companyId,companyName})=>{
    return "Update succesfull";
});

Given('Enter company id: {string}, name: {string} for updating a company',
(companyId,companyName)=>{
    this.companyId=companyId || undefined;
    this.companyName=companyName || undefined;

});
Given('Enter company id: {string}, name: {int} for updating a company',
    (companyId,companyName) => {
        this.companyId=companyId || undefined;
        this.companyName=companyName || undefined;
    },
);

When('Try to update a company',async ()=>{
    const updateCompany = makeupdateCompany({
        Joi,
        ValidationError:exceptions.ValidationError,
        ObjectNotFoundError:exceptions.ObjectNotFoundError,
        ObjectAlreadyExistError:exceptions.ObjectAlreadyExistError,
        getDbCompanyData:CompanyDb.getDbCompanyData,
        getDbCompanybyName:CompanyDb.getDbCompanybyName,
        updateDbCompanyData: CompanyDb.updateDbCompanyData
    });
    try
    {
        this.result = await updateCompany({
            companyId:this.companyId,
            companyName:this.companyName,
            empDesignation:this.empDesignation
        })
    }
    catch(e)
    {
        this.error = {
          name: e.name,
          message: e.message,
        };
    }
})


Then('Throw an error: {string} with message: {string} while updating a company',(error,message)=>{
    expect(this.error).deep.equal({
        name:error,
        message
    });
});

Then('Updated the company :: {string}', (message) => {
    expect(this.result).deep.equal(message);
});
