const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
const sinon = require('sinon');
const sandbox = sinon.createSandbox();
const expect = require('chai').expect;
const Joi = require('joi');

Before(() => {
  this.result = undefined;
  this.error = undefined;

  sandbox.resetHistory();
});

const companyDb = {
    getAllDbCompanyData:()=>{}
};

const makegetAllCompanyData = require('./get-All--company-data');

const getAllDbCompanyDataStub = sandbox.stub(companyDb,"getAllDbCompanyData");

getAllDbCompanyDataStub.callsFake(()=>{
  return [
      {
        "company_id": "18691581-12ab-4a19-8572-0cc939787b2b",
        "company_name": "RapidOps3"
      },
      {
        "company_id": "31418924-77de-4d55-a744-04a08ba1d59a",
        "company_name": "New-AbcdPvt"
      }
  ];
});

Given(
  'Get all company data.',
  () => {}
);

When('Try to get all company.', async () => {
  try {
    const getAllCompanyData =  makegetAllCompanyData({
        getAllDbCompanyData:companyDb.getAllDbCompanyData,
    });
    this.result = await getAllCompanyData();
  } 
  catch (e) {
    this.error = e;
  }
});

Then('It will give company list: "{string}"', (companydetail) => {
   expect(this.result).deep.equal(JSON.parse(companydetail)); 
});


Then('getAllCompanyData function will call {int}  times', (count) => {
    sinon.assert.callCount(getAllDbCompanyDataStub, count)
});  