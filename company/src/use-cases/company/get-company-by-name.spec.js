const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('joi');
const exceptions = require('../../exceptions')

const makegetCompanybyName = require('./get-company-by-name');

const sandbox = sinon.createSandbox();

Before(() => {
    this.companyName = undefined;
    this.result = undefined;
    this.error = undefined;
  
    sandbox.resetHistory();
});


const CompanyDb = {
    getDbCompanybyName: function(){}
};

const getDbCompanybyNameStub = sandbox.stub(CompanyDb,'getDbCompanybyName');

getDbCompanybyNameStub.callsFake(({companyName}) => {
    if(!companyName || companyName=='Abcdef'){
        return [];
    }

    return [
        {
          "company_id": "4c1e7d54-b379-4524-aa02-78f3ad8d494b",
          "company_name": "AbcPvt"
        }
      ];
});



Given('Enter Company name: {string} to get a Company by name',
    (companyName) => {
        this.companyName=(companyName) || undefined;
    },
);


When('Try to get a Company by name', async ()=>{
    const getCompanybyName = makegetCompanybyName({
        Joi, 
        ValidationError:exceptions.ValidationError,
        ObjectNotFoundError:exceptions.ObjectNotFoundError,
        getDbCompanybyName: CompanyDb.getDbCompanybyName,
    });
    try 
    {
        this.result = await getCompanybyName({
          companyName: this.companyName
        });
    } 
    catch (e) {
        this.error = {
          name: e.name,
          message: e.message,
        };
    }
});


Then('Throw error: {string} with message: {string} while getting a Company by name', (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
});


Then('Got the Company by its name: "{string}"', (message) => {
    expect(JSON.stringify(this.result)).deep.equal(message);
});