const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('joi');
const exceptions = require('../../exceptions');

const makedeleteEmployee = require('./delete-employee');

const sandbox = sinon.createSandbox();

Before(() => {
    this.employeeId = undefined;
    this.result = undefined;
    this.error = undefined;
  
    sandbox.resetHistory();
  });


const employeeDb = {
    deleteDbEmployee: function(){},
    getDbEmployee:function(){}
};

const deleteEmployeeStub = sandbox.stub(employeeDb,'deleteDbEmployee');
deleteEmployeeStub.callsFake(({employeeId}) => {
    return "Deleted the employee succesfully"
});

const getDbEmployeeStub = sandbox.stub(employeeDb,'getDbEmployee');
getDbEmployeeStub.callsFake(({employeeId}) => {
    if(employeeId=='7c08cc2f-b148-4772-b062-b0859742cf7c'){
        return [{
            "employee_id": "7c08cc2f-b148-4772-b062-b0859742cf7c",
            "employee_name": "Atulll",
            "employee_email": "atulmakwana4500@gmail.com",
            "employee_designation": "Intern",
            "emp_company_id": "4c1e7d54-b379-4524-aa02-78f3ad8d494b",
            "is_varified": true
          }];
    }
    return [];
});

Given('Enter employee id: {string} to delete a employee',
    (employeeId) => {
        this.employeeId=(employeeId) || undefined;
    },
);


When('Try to delete a employee', async ()=>{
    if(this.employeeId){
        this.employeeId=this.employeeId;
    }
    const deleteEmployee = makedeleteEmployee({
        Joi,  
        ValidationError:exceptions.ValidationError,
        ObjectNotFoundError:exceptions.ObjectNotFoundError,
        getDbEmployee:employeeDb.getDbEmployee,
        deleteDbEmployee: employeeDb.deleteDbEmployee,
    });
    try 
    {
        this.result = await deleteEmployee({
            employeeId: this.employeeId
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


Then('Throw error: {string} with message: {string} while deleting a employee', (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
});


Then('Show message: {string}', (message) => {
    expect(this.result).deep.equal(message);
});