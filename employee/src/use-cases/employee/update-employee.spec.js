const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('joi');
const exceptions = require('../../exceptions');

const makeupdateEmployee = require('./update-employee');

const sandbox = sinon.createSandbox();

Before(() => {
    this.employeeId = undefined;
    this.employeeName = undefined;
    this.empDesignation = undefined;
    this.result = undefined;
    this.error = undefined;
  
    sandbox.resetHistory();
});

const getEmployee = function({employeeId})
{
    if(!employeeId || employeeId=='1c08cc2f-b148-4772-b062-b0859742cf7c'){
        return [];
    }

    return [
        {
            employeeId: '23bdf750-0695-11ee-ba84-6b13c17d4a43',
            name: 'Atulll',
            designation:'SE'
        }
      ]
}

const employeeDb = {
    updateDbEmployee: function(){}
}

const updateDbEmployeeStub = sandbox.stub(employeeDb,'updateDbEmployee');
updateDbEmployeeStub.callsFake(({employeeId})=>{
    if(employeeId=='23bdf750-0695-11ee-ba84-6b13c17d4a43'){
        return "Update succesfull";
    }
});


Given('Enter employee id: {string}, name: {string} and designation : {string} for updating a employee',
(employeeId,employeeName,empDesignation)=>{
    this.employeeId=employeeId || undefined;
    this.employeeName=employeeName || undefined;
    this.empDesignation=empDesignation || undefined;
});

Given('Enter employee id: {string}, name: {string} and designation : {int} for updating a employee',
    (employeeId,employeeName,empDesignation) => {
        this.employeeId=employeeId || undefined;
        this.employeeName=employeeName || undefined;
        this.empDesignation=empDesignation || undefined;
    },
);

When('Try to update a employee',async ()=>{
    const updateEmployee = makeupdateEmployee({
        Joi, 
        ValidationError:exceptions.ValidationError,
        ObjectNotFoundError:exceptions.ObjectNotFoundError,
        getEmployee,
        updateDbEmployee: employeeDb.updateDbEmployee
    });
    try
    {
        this.result = await updateEmployee({
            employeeId:this.employeeId,
            employeeName:this.employeeName,
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


Then('Throw an error: {string} with message: {string} while updating a employee',(error,message)=>{
   
    expect(this.error).deep.equal({
        name:error,
        message
    });
});

Then('Updated the employee :: {string}', (message) => {
    expect(this.result).deep.equal(message);
});
