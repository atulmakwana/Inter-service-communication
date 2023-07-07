const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('joi');
const exceptions = require('../../exceptions');

const makeCreateRole = require('./create-role');

const sandbox = sinon.createSandbox();

Before(() => {
    this.companyName = undefined;
    this.name=undefined;
    this.permissions=undefined;
    this.isMaster=undefined;
    this.result = undefined;
    this.error = undefined;
  
    sandbox.resetHistory();
});

const companyDb = {
    getCopmanybyName: function(){}
};
const getCopmanybyNameStub = sandbox.stub(companyDb,'getCopmanybyName');
getCopmanybyNameStub.callsFake((args) => {
    expect(args).deep.equal({
        companyName: this.companyName
    });
    if(this.companyName=='AbcPvt2'){
        return [];
    }
    return [
        {
          "company_id": "18691581-12ab-4a19-8572-0cc939787b2b",
          "company_name": "AbcPvt"
        }
      ]
});

const roleDb = {
    createDbRole: function(){}
};

const createDbRoleStub = sandbox.stub(roleDb,'createDbRole');
createDbRoleStub.callsFake((args) => {
    return [{
        role_id: "88130013-3d74-4d33-bbfe-635f742c6bc9"
    }];
});


Given('Company name: {string}, name: {string}, permissions: "{string}" and Is Master:{string}',
    (companyName,name,permissions,isMaster) => {
        this.companyName=companyName || undefined;
        this.name=name || undefined;
        this.permissions=permissions || undefined;
        this.isMaster=isMaster || undefined;
    },
);

When('Try to create a new role', async ()=>{
    const createRole = makeCreateRole({
        Joi, 
        ValidationError:exceptions.ValidationError,
        ObjectNotFoundError:exceptions.ObjectNotFoundError,
        createDbRole:roleDb.createDbRole,
        getCopmanybyName:companyDb.getCopmanybyName
    });
    try 
    {
        this.result = await createRole({
            companyName:this.companyName,
            name:this.name,
            permissions:this.permissions,
            isMaster:this.isMaster
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


Then('Throw error: {string} with message: {string} while creating a new role', (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
});


Then('Show message: "{string}" while creating a new role', (message) => {
    expect(JSON.stringify(this.result)).deep.equal(message);
});
