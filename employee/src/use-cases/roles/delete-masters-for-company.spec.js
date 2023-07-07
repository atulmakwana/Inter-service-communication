const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('joi');
const exceptions = require('../../exceptions');

const makedeleteMasterForCompany = require('./delete-masters-for-company');

const sandbox = sinon.createSandbox();

Before(() => {
    this.companyId = undefined;
    this.result = undefined;
    this.error = undefined;
  
    sandbox.resetHistory();
});


const roleDb = {
    deleteDbMasterForCompany: function(){},
};

const deleteDbMasterForCompanyStub = sandbox.stub(roleDb,'deleteDbMasterForCompany');
deleteDbMasterForCompanyStub.callsFake((args) => {
    expect(args).deep.equal({
        companyId: this.companyId
    });
    return 'Deleted the Master successfull';
});


Given('Enter Company Id: {string}',
    (companyId) => {
        this.companyId=(companyId) || undefined;
    },
);

When('Try to delete Master for deleting company', async ()=>{
    const deleteMasterForCompany = makedeleteMasterForCompany({
        Joi,
        ValidationError:exceptions.ValidationError,
        deleteDbMasterForCompany:roleDb.deleteDbMasterForCompany
    });
    try 
    {
        this.result = await deleteMasterForCompany({
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


Then('Throw error: {string} with message: {string} deleting master for deleting company', (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
});


Then('Show message: {string} while deleting Master for deleting company', (message) => {
    expect(this.result).deep.equal(message);
});