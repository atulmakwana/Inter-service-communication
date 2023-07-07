const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('joi');
const exceptions = require('../../exceptions')

const makecreateCompanyData = require('./create-company-data');

const sandbox = sinon.createSandbox();

Before(() => {
    this.companyName = undefined;
    this.result = undefined;
    this.error = undefined;
  
    sandbox.resetHistory();
  });

const companyDb = {
  createDbCompanyData: function(){},
  getDbCompanybyName: function(){}
};

const createDbCompanyDataStub = sandbox.stub(companyDb, 'createDbCompanyData');
createDbCompanyDataStub.callsFake((args) => {
  expect(args).deep.equal({
    companyName: this.companyName,
  });
  return [ { company_id: '0674675f-fbad-43bf-9b45-72fae0532b1d' } ];
});

const getDbCompanybyNameStub = sandbox.stub(companyDb, 'getDbCompanybyName');
getDbCompanybyNameStub.callsFake((args) => {
  if(args.companyName=='AbcPvt'){
    return [
      {
        company_id: '4c1e7d54-b379-4524-aa02-78f3ad8d494b',
        company_name: 'AbcPvt'
      }];
  }
  return [];
});

Given('company details name: {string} to create new company',
    (companyName) => {
      this.companyName = companyName || undefined;
    },
);
Given('company name : {int} to create new company',
    (companyName) => {
      this.companyName = companyName || undefined;
    },
);

When('Try to create new company', async ()=>{
    const createCompanyData = makecreateCompanyData({
        Joi, 
        ValidationError:exceptions.ValidationError,
        ObjectAlreadyExistError:exceptions.ObjectAlreadyExistError,
        getDbCompanybyName:companyDb.getDbCompanybyName,
        createDbCompanyData: companyDb.createDbCompanyData
    });
    try 
    {
        this.result = await createCompanyData({
          companyName: this.companyName,
        });

    } 
      catch (e) {
        this.error = {
          name: e.name,
          message: e.message,
        };
      }
});


Then('Throw error: {string} with message: {string} while creating a company', (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
});

Then('It will create new company with details: "{string}"', (newcompanyDetails) => {
  expect(JSON.stringify(this.result)).deep.equal(newcompanyDetails);
});
