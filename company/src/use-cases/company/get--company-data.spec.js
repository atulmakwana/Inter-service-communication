const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('joi');
const exceptions = require('../../exceptions')

const makegetCompany = require('./get--company-data');

const sandbox = sinon.createSandbox();

Before(() => {
    this.companyId = undefined;
    this.result = undefined;
    this.error = undefined;
  
    sandbox.resetHistory();
  });


const CompanyDb = {
    getDbCompanyData: function(){}
};

const getDbCompanyDataStub = sandbox.stub(CompanyDb,'getDbCompanyData');

getDbCompanyDataStub.callsFake(({companyId}) => {
    if(companyId=='78965412-12ab-4a19-8572-0cc939787b2b'){
        return []
    }

    return [
        {
          "company_id": "18691581-12ab-4a19-8572-0cc939787b2b",
          "company_name": "New-AbcPvt"
        }
      ];
});



Given('Enter CompanyId: {string} for get an Company',
    (companyId) => {
        this.companyId=(companyId) || undefined;
    },
);


When('Try to get an Company', async ()=>{
    const getCompany = makegetCompany({
        Joi, 
        ValidationError:exceptions.ValidationError,
        getDbCompanyData: CompanyDb.getDbCompanyData,
    });
    try 
    {
        this.result = await getCompany({
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


Then('Throw error: {string} with message: {string} while getting an Company', (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
});


Then('Got the Company: "{string}"', (message) => {
    expect(JSON.stringify(this.result)).deep.equal(message);
});